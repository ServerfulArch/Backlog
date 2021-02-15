
const QDB = require("qdatabase");
const Qulity = require("qulity");

const Defaults = new Qulity.Collection({
    "Persistent Path": "BackLog/Persistent.qdb",
    "Connection": {}
});

class BackLog {

    /**
     * An off-load key/value-based cache.
     * @param {String} Identifier A storage identifier for this instance.
     */
    constructor (Identifier) {

        if (typeof Identifier !== "string") throw new Error("BackLog identifiers should be a type of String.");

        /**
         * Identifier of this BackLog map.
         * @name BackLog#Identifier
         * @type {String}
         * @readonly
         */
        Object.defineProperty(this, "Identifier", {
            enumerable: true,
            value: Identifier
        });
        
        /**
         * Active cache which will get pushed to persistent disk on exit.
         * @name BackLog#Cache
         * @type {Map}
         * @readonly
         */
        Object.defineProperty(this, "Cache", {
            enumerable: true,
            value: new Qulity.Collection()
        });

        /**
         * A defer Promise that resolves once this BackLog is done loading.
         * @name BackLog#Ready
         * @type {Promise}
         * @readonly
         */
        Object.defineProperty(this, "Ready", {
            value: new Promise(Resolve => {
                setImmediate(() => {
                    this.PullPersistent();
                    process.on("beforeExit", this.PushPersistent);
                    Resolve();
                });
            })
        });

        /**
         * Settings of this BackLog.
         * @name BackLog#Settings
         * @type {Map}
         * @private
         */
        Object.defineProperty(this, "Settings", {
            value: Defaults.Clone()
        });

    }


    /**
     * Returns a new QDB Connection.
     * @returns {Connection}
     * @private
     */
    QDBConnection () {
        const Path = this.Settings.get("Persistent Path");
        return new QDB.Connection(Path, {
            ...this.Settings.get("Connection") || {},
            Table: this.Identifier
        });
    }

    /**
     * Pulls the items from persistent memory into this BackLog.
     * @returns {BackLog}
     * @private
     */
    PullPersistent () {
        const Connection = this.QDBConnection();        
        Connection.Each((V, K) => this.Cache.set(K, V));
        Connection.Erase(...Connection.Indexes);

        Connection.Disconnect();
        return this;
    }

    /**
     * Moves the current items from this BackLog instance into
     * persistent memory, provided by the identifier of the BackLog.
     * @returns {BackLog}
     * @private
     */
    PushPersistent () {
        const Connection = this.QDBConnection();
        for (const [Key, Val] of this.Cache)
        Connection.Set(Key, Val);

        Connection.Disconnect();
        return this;
    }


    /**
     * Modifies the settings of this BackLog instance.
     * @param {Object|*} Key Either a list of key/values or just a key.
     * @param {*} Val If a singular key was provided, a value for this option.
     * @returns {Collection}
     */
    Config (Key, Val) {
        if (typeof Key === "object") {
            for (const K of Key)
            this.Settings.set(K, Key[K]);
            return this.Settings;
        }

        this.Settings.set(Key, Val);
        return this.Settings;
    }

    /**
     * Modifies the default settings of BackLog.
     * @param {Object|*} Key Either a list of key/values or just a key.
     * @param {*} Val If a singular key was provided, a value for this default option.
     * @returns {Collection}
     * @static
     */
    static Default (Key, Val) {
        if (typeof Key === "object") {
            for (const K of Key)
            Defaults.set(K, Key[K])
            return Defaults;
        }

        Defaults.set(Key, Val);
        return Defaults;
    }

}

module.exports = BackLog;

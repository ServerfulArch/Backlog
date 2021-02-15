
# BackLog



An off-load key/value-based cache.

| Key | Type | Description |
| --- | --- | --- |
| Identifier | String |  |

foo



# Values
## [.Identifier](https://github.com/ServerfulArch/Backlog/blob/master/BackLog.js#L19)
> Identifier of this BackLog map. [**Read Only**]
>
> Type **{String}**

## [.Cache](https://github.com/ServerfulArch/Backlog/blob/master/BackLog.js#L30)
> Active cache which will get pushed to persistent disk on exit. [**Read Only**]
>
> Type **{Map}**

## [.Ready](https://github.com/ServerfulArch/Backlog/blob/master/BackLog.js#L41)
> A defer Promise that resolves once this BackLog is done loading. [**Read Only**]
>
> Type **{Promise}**

# Methods
## [.Config(Key, Val)](https://github.com/ServerfulArch/Backlog/blob/master/BackLog.js#L113)
> Modifies the settings of this BackLog instance.
> | Key | Type | Description |
> | --- | --- | --- |
> | Key | Object, Any |  |
> | Val | Any |  |
>
> Returns **{Collection}** 

## [.Default(Key, Val)](https://github.com/ServerfulArch/Backlog/blob/master/BackLog.js#L130) [**Static**]
> Modifies the default settings of BackLog.
> | Key | Type | Description |
> | --- | --- | --- |
> | Key | Object, Any |  |
> | Val | Any |  |
>
> Returns **{Collection}** 

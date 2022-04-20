## [2.1.4](https://github.com/herbsjs/herbs2gql/compare/v2.1.3...v2.1.4) (2022-04-20)


### Bug Fixes

* update semantic release version ([0a20216](https://github.com/herbsjs/herbs2gql/commit/0a20216e279e9f5d4df3c8cbacde2fc5e6898505))

## [2.1.3](https://github.com/herbsjs/herbs2gql/compare/v2.1.2...v2.1.3) (2022-04-16)


### Bug Fixes

* **deps:** bump path-parse from 1.0.6 to 1.0.7 ([cd82352](https://github.com/herbsjs/herbs2gql/commit/cd82352f96a2acd59504a50efe6daeaccc13e042))

## [2.1.2](https://github.com/herbsjs/herbs2gql/compare/v2.1.1...v2.1.2) (2022-04-16)


### Bug Fixes

* **deps:** bump y18n from 4.0.0 to 4.0.3 ([5499e99](https://github.com/herbsjs/herbs2gql/commit/5499e997249126a4638ec7bd2f3168108e19c37c))

## [2.1.1](https://github.com/herbsjs/herbs2gql/compare/v2.1.0...v2.1.1) (2022-04-11)


### Bug Fixes

* dependency update, mainly apollo, because it had security flaw ([7aa3ef1](https://github.com/herbsjs/herbs2gql/commit/7aa3ef1bb089e445ac53aa116f82b2307f02384f))

# [2.1.0](https://github.com/herbsjs/herbs2gql/compare/v2.0.1...v2.1.0) (2022-02-14)


### Features

* **defaultresolver:** adds support to custom error handler on defaultResolver ([4eaaee2](https://github.com/herbsjs/herbs2gql/commit/4eaaee2ebe80ceacd8793cb9344bb6b63ceeb328)), closes [#23](https://github.com/herbsjs/herbs2gql/issues/23)

## [2.0.1](https://github.com/herbsjs/herbs2gql/compare/v2.0.0...v2.0.1) (2022-01-15)


### Bug Fixes

* update herbs depedencies ([ded48a4](https://github.com/herbsjs/herbs2gql/commit/ded48a4358223d26c835a1564ef296a12a608c40))

# [2.0.0](https://github.com/herbsjs/herbs2gql/compare/v1.1.0...v2.0.0) (2021-12-04)


### Features

* **default resolver:** better Apollo Error using Herbs Known Errors ([4158e99](https://github.com/herbsjs/herbs2gql/commit/4158e99658733389b8b533b0976615dc0903afbd)), closes [#27](https://github.com/herbsjs/herbs2gql/issues/27)


### BREAKING CHANGES

* **default resolver:** Step codes using generic Err should just change UserInputError `invalidArgs` to
`cause`. However, steps code that are already returning Known Errors will change the behavior of the
default resolver and should expect a different Error.

# [1.1.0](https://github.com/herbsjs/herbs2gql/compare/v1.0.0...v1.1.0) (2021-11-09)


### Features

* **component:** update apollo-server package version ([9b32a27](https://github.com/herbsjs/herbs2gql/commit/9b32a2789dd08fd80af059c8c73fcd4efbfbecc3))
* **component:** update apollo-server package version ([0734a04](https://github.com/herbsjs/herbs2gql/commit/0734a04eb1f9cfad15bc7d8b3a23ac68868a11a6))

# 1.0.0 (2021-06-23)


### Features

* change library to herbs organization ([1e7b522](https://github.com/herbsjs/herbs2gql/commit/1e7b522d02f11e1ff4fed3557616e8d0a5355afa))

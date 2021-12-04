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

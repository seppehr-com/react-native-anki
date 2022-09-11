module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    assets: ["./assets/fonts/"], // stays the same,
    dependencies: {
      "react-native-sqlite-storage": {
        platforms: {
          android: {
            sourceDir:
              "../node_modules/react-native-sqlite-storage/platforms/android-native",
            packageImportPath: "import io.liteglue.SQLitePluginPackage;",
            packageInstance: "new SQLitePluginPackage()"
          }
        }
      }
    }
  };
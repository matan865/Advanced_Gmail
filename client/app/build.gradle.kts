import java.io.File
import java.io.ByteArrayOutputStream
plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.mygmail"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.mygmail"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

val sdkDir: File = android.sdkDirectory
val adbExecutableName = if (System.getProperty("os.name").lowercase().contains("win")) "adb.exe" else "adb"
val adbPath: String = File(sdkDir, "platform-tools/$adbExecutableName").absolutePath
val adbSerial: String? = findProperty("adbSerial") as String?

tasks.register<Exec>("adbReverse") {
    isIgnoreExitValue = true
    doFirst {
        val out = ByteArrayOutputStream()
        exec {
            commandLine(adbPath, "devices")
            standardOutput = out
            isIgnoreExitValue = true
        }
        val devices = out.toString("UTF-8")
            .lineSequence()
            .filter { it.endsWith("\tdevice") }
            .map { it.substringBefore('\t') }
            .toList()

        when {
            devices.isEmpty() -> {
                println("adbReverse: no connected device/emulator. Skipping.")
                this.enabled = false
                return@doFirst
            }
            adbSerial == null && devices.size > 1 -> {
                println("adbReverse: multiple devices found ${devices}. " +
                        "Pass -PadbSerial=<serial> to target a specific one. Skipping.")
                this.enabled = false
                return@doFirst
            }
            else -> {
                val target = adbSerial ?: devices.first()
                println("adbReverse: using adb at $adbPath, target serial: $target")
                if (adbSerial != null || devices.size == 1) {
                    if (adbSerial != null) {
                        commandLine(adbPath, "-s", target, "reverse", "tcp:3000", "tcp:3000")
                    } else {
                        commandLine(adbPath, "reverse", "tcp:3000", "tcp:3000")
                    }
                }
            }
        }
    }
}

tasks.named("preBuild") {
    dependsOn("adbReverse")
}


dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.okhttp3:okhttp:4.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation ("androidx.lifecycle:lifecycle-viewmodel:2.8.4")
    implementation ("androidx.lifecycle:lifecycle-livedata:2.8.4")
    implementation ("androidx.room:room-runtime:2.6.1")
    annotationProcessor ("androidx.room:room-compiler:2.6.1")
    implementation ("com.google.android.material:material:1.12.0")
    implementation ("androidx.cardview:cardview:1.0.0")
}
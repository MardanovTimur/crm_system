#!/bin/bash
#Release react-native node
cd android && ./gradlew assembleRelease && adb install -r app/build/outputs/apk/app-release.apk && cd ..

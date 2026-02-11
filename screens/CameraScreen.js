import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeInDown,
} from "react-native-reanimated";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Permissions,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
// import { RNS3 } from "react-native-aws3";
import AWS from "aws-sdk";

import { useNavigation } from "@react-navigation/native";

export default function CameraScreen({ route }) {
  const [image, setImage] = useState(null);

  const [value, setValue] = useState([]);

  const [lastSelectedButton, setLastSelectedButton] = useState(null);
  const [lastSelectedApi, setLastSelectedApi] = useState(null);

  const [search, setSearch] = useState("");
  const [search_1, setSearch_1] = useState("");
  const [search_2, setSearch_2] = useState("");
  const [search_3, setSearch_3] = useState("");
  const [search_4, setSearch_4] = useState("");
  const [search_5, setSearch_5] = useState("");

  const [clicked, setClicked] = useState(false);
  const [clicked_1, setClicked_1] = useState(false);
  const [clicked_2, setClicked_2] = useState(false);
  const [clicked_3, setClicked_3] = useState(false);
  const [clicked_4, setClicked_4] = useState(false);
  const [clicked_5, setClicked_5] = useState(false);

  const VisitorData = ["Vendor", "Customer", "Supplier", "Others"];
  const visitorValue = VisitorData[0];

  const [data, setData] = useState(" ");
  const [data_1, setData_1] = useState(" ");
  const [data_2, setData_2] = useState(" ");
  const [data_3, setData_3] = useState(" ");
  const [data_4, setData_4] = useState(" ");
  const [data_5, setData_5] = useState(" ");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountry_1, setSelectedCountry_1] = useState("");
  const [selectedCountry_2, setSelectedCountry_2] = useState("");
  const [selectedCountry_3, setSelectedCountry_3] = useState("");
  const [selectedCountry_4, setSelectedCountry_4] = useState("");
  const [selectedCountry_5, setSelectedCountry_5] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  console.log("data", data);
  const searchRef = useRef();
  const onSearch = (search) => {
    if (search !== "") {
      let tempData = data.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      console.log("tempData", tempData);
      setData(tempData);
    } else {
      setData(data);
    }
  };
  console.log("data_1", data_1);
  const onSearch_1 = (search) => {
    if (search !== "") {
      let tempData = data_1.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData_1(tempData);
    } else {
      setData_1(data_1);
    }
  };
  const onSearch_2 = (search) => {
    if (search !== "") {
      let tempData = data_2.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData_2(tempData);
    } else {
      setData_2(data);
    }
  };
  const onSearch_3 = (search) => {
    if (search !== "") {
      let tempData = data_3.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData_3(tempData);
    } else {
      setData_3(data);
    }
  };
  const onSearch_4 = (search) => {
    if (search !== "") {
      let tempData = data_4.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData_4(tempData);
    } else {
      setData_4(data);
    }
  };
  const onSearch_5 = (search) => {
    if (search !== "") {
      let tempData = data_5.filter((item) => {
        return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData_5(tempData);
    } else {
      setData_5(VisitorData);
    }
  };

  const navigation = useNavigation();
  //   if (!route.params) {
  //     // Handle case where params are not available
  //     return (
  //       <View style={styles.container}>
  //         <Text>Error: Params not available</Text>
  //       </View>
  //     );
  //   }

  const addExtractedData = () => {
    var { user_name } = route.params;
    console.log("Camera screen data", user_name);
    const data_value = {
      username: user_name,
      extracted_data: extractedText,
    };
    const url = "http://172.18.16.23:3000/api/login/add";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data_value),
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setValue([data_value]);
  };
  const addExtractedDataTable = () => {
    const data_value = {
      username: scanned_Data,
      extracted_data: extractedText,
    };
    const url = "http://172.18.16.23:3001/api/visitingcard/add";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data_value),
    })
      .then((response) => {
        console.log("response", response);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setValue([data_value]);
  };

  const [extractedText, setExtractedText] = useState("");

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0].uri);

      setImage(result.assets[0].uri);
      setLastSelectedButton("gallery");
    }
  };

  AWS.config.update({
    accessKeyId: "AWS_KEY",
    secretAccessKey: "AWS_PASS",
    region: "ap-south-1",
  });
  const s3 = new AWS.S3();

  const pickImageCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        base64: true,
        allowsMultipleSelection: false,
      });
      if (!result.canceled) {
        try {
          // Read the image file and convert it to base64
          const response = await fetch(result.assets[0].uri);
          const blob = await response.blob();
          // const base64Image = await blobToBase64(blob);

          // Upload the base64 encoded image to S3 bucket
          const fileName = `${Date.now()}.jpeg`; // Unique file name for the image

          const params = {
            Bucket: "mobile-ai-app",
            Key: fileName,
            Body: blob,
            mimeType: "image/jpeg",
            ACL: "public-read",
          };

          s3.upload(params, async (err, data) => {
            if (err) {
              console.log("S3 upload error:", err);
            } else {
              console.log("S3 upload success:", data.Location);

              performOCR(fileName);
            }
          });

          setImage(result.assets[0].uri);
          setLastSelectedButton("camera");
          setLastSelectedApi("text");
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }
    } else {
      // Permission denied
      Alert.alert("Camera permission required");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Camera roll permission required");
      }
    })();
  }, []);

  // Function to perform OCR on an image
  // and extract text
  // Function to perform OCR on an image and extract text

  const performOCR = (file) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      file_name: file,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: raw,
      redirect: "follow",
    };

    fetch("http://43.205.195.138:5000/textract_text", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        console.log("result", result);
        setData(parsedResult); // Assuming setData is a function to set data in some state
        setData_1(parsedResult);
        setData_2(parsedResult);
        setData_3(parsedResult);
        setData_4(parsedResult);
        setData_5(parsedResult);
        // Assuming setData_1 is a function to set data in some other state
      })
      .catch((error) => console.error(error));
  };
  // console.log("extracted", extractedText);
  // const newFunction = ({ extractedText }) => {
  //   // Parse the JSON string into a JavaScript object
  //   return extractedText.text;
  // };
  // const dataArray = [
  //   "Vir Pratap Singh",
  //   "Senior Account Manager - Microsoft Surface",
  //   "+91 9289560633",
  //   "team",
  //   "vir.singh@teamcomputers.com",
  //   "COMPUTERS",
  //   "www.teamcomputers.com",
  // ];

  // Function to find the email
  // const findEmail = (dataArray) => {
  //   for (let i = 0; i < dataArray.length; i++) {
  //     const element = dataArray[i];
  //     if (isValidEmail(element)) {
  //       return element;
  //     }
  //   }
  //   return null; // Return null if no valid email found
  // };

  // // Function to check if a string is a valid email
  // const isValidEmail = (str) => {
  //   // Regular expression for basic email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(str);
  // };

  // // Usage example
  // const email = findEmail(data);
  // if (email) {
  //   console.log("Found email:", email);
  // } else {
  //   console.log("No valid email found in the array.");
  // }

  const array1 = data !== null ? data : [];

  let email = null;
  let domain = null;
  let username = null;
  // let closestMatch = null;
  let closestMatched = null;
  let designation = null;
  let phoneNumber = null;

  // Function to find email from an array and separate email and number
  const findEmailAndNumber = (arr) => {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (
          typeof item === "string" &&
          item.includes("@") &&
          item.includes(".")
        ) {
          // Split the string by space to separate email and number part
          const parts = item.split(" ");
          parts.forEach((part) => {
            if (part.includes("@") && part.includes(".")) {
              email = part;
            } else if (!isNaN(part.replace(/-/g, ""))) {
              // Check if part is a phone number
              phoneNumber = part.replace(/-/g, "");
              // Remove commas from the phone number
            }
          });
        }
      });
    }
  };

  // Find email and number in array1
  findEmailAndNumber(array1);
  console.log("phoneNumber", phoneNumber);

  // Print email and number if found
  if (email) {
    console.log("Email:", email);
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex + 1) {
      domain = email.substring(atIndex + 1, dotIndex);
      domain = domain.toUpperCase();
      username = email.substring(0, atIndex);
      console.log("Domain:", domain);
      console.log("Username:", username);
      if (!data.includes(domain)) {
        data.push(domain);
      }
      if (phoneNumber != null) {
        if (!data.includes(phoneNumber)) {
          data.push(phoneNumber);
        }
      }

      let nonEmailArray = array1.filter(
        (item) =>
          typeof item === "string" &&
          !item.includes("@") &&
          !item.includes(".com") &&
          !item.includes(".edu") &&
          !item.includes(".in")
      );
      console.log("nonEmailArray", nonEmailArray);
      // closestMatch = null;
      // let closestDistance = Infinity;

      // array1.forEach((item) => {
      //   if (typeof item === "string" && item !== email) {
      //     // Calculate Levenshtein distance
      //     const distance = levenshteinDistance(username, item);
      //     if (distance < closestDistance) {
      //       closestDistance = distance;
      //       closestMatch = item;
      //     }
      //   }
      // });

      designation = nonEmailArray[1];
      console.log("Designation:", designation);
      const stringSimilarity = require("string-similarity");
      // Import the library
      const { findBestMatch } = require("string-similarity");

      // Find closest match to username using fuzzy token ratio
      closestMatched = null;
      let highestMatchRatio = -Infinity;

      nonEmailArray.forEach((item) => {
        if (typeof item === "string" && item !== email) {
          // Calculate token ratio
          const matchRatio = stringSimilarity.compareTwoStrings(username, item);
          if (matchRatio > highestMatchRatio) {
            highestMatchRatio = matchRatio;
            closestMatched = item;
          }
        }
      });

      if (closestMatched) {
        console.log("Closest match to usernamed:", closestMatched);
        console.log("Match ratio:", highestMatchRatio);
      } else {
        console.log("No closest match found.");
      }
    } else {
      console.log("Invalid email format.");
    }
  } else {
    console.log("No valid email found.");
  }

  // Function to extract domain from email

  // function levenshteinDistance(a, b) {
  //   if (a.length === 0) return b.length;
  //   if (b.length === 0) return a.length;

  //   let matrix = [];

  //   // Initialize the matrix
  //   for (let i = 0; i <= b.length; i++) {
  //     matrix[i] = [i];
  //   }

  //   for (let j = 0; j <= a.length; j++) {
  //     matrix[0][j] = j;
  //   }

  //   // Fill in the rest of the matrix
  //   for (let i = 1; i <= b.length; i++) {
  //     for (let j = 1; j <= a.length; j++) {
  //       if (b.charAt(i - 1) === a.charAt(j - 1)) {
  //         matrix[i][j] = matrix[i - 1][j - 1];
  //       } else {
  //         matrix[i][j] = Math.min(
  //           matrix[i - 1][j - 1] + 1, // substitution
  //           matrix[i][j - 1] + 1, // insertion
  //           matrix[i - 1][j] + 1 // deletion
  //         );
  //       }
  //     }
  //   }

  //   return matrix[b.length][a.length];
  // }

  // Regular expression to match mobile number format
  const mobileNumberRegex = /\+91-\d{10}/;
  const mobileNumberRegex2 = /\+91 \d{10}/;
  const mobileNumberRegex3 = /\b\d{5}-\d{5}\b/;
  const mobileNumberRegex4 = /\+91 \d{5} \d{5}/;
  const mobileNumberRegex5 = /\+d{5}1 \d{5} \d{5}/;
  const mobileNumberRegex6 = /\b\d{5,6}-\d{5}\b/g;

  // Function to find the mobile number element
  const findMobileNumber = (contactInfo) => {
    for (let item of contactInfo) {
      if (phoneNumber != null) {
        return phoneNumber;
      }
      if (
        mobileNumberRegex.test(item) ||
        mobileNumberRegex2.test(item) ||
        mobileNumberRegex3.test(item) ||
        mobileNumberRegex4.test(item) ||
        mobileNumberRegex5.test(item) ||
        mobileNumberRegex6.test(item)
      ) {
        return item;
      }
    }
    return null;
  };

  // Call the function to find the mobile number element
  const mobileNumberElement = findMobileNumber(data);

  if (mobileNumberElement) {
    console.log("Mobile number found:", mobileNumberElement);
  } else {
    console.log("No mobile number found in contactInfo.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image1}
        source={require("../assets/background.png")}
      />
      {!image && (
        <View style={styles.hangs}>
          <Animated.View
            entering={FadeInDown.delay(600).duration(2000).springify()}
          >
            <TouchableOpacity style={styles.opacity3}>
              <Text
                style={styles.text}
                onPress={() => {
                  navigation.navigate("Login", {
                    selectedCountry: "",
                    selectedCountry_1: "",
                    selectedCountry_2: "",
                    selectedCountry_3: "",
                    selectedCountry_4: "",
                  });
                }}
              >
                Back
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(4000).springify().damping(5)}
            style={styles.image4}
            source={require("../assets/light.png")}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(4000).springify().damping(6)}
            style={styles.image5}
            source={require("../assets/light.png")}
          />
        </View>
      )}
      {image && (
        <Button
          color="white"
          style={styles.backbutton}
          title="Back"
          onPress={() => {
            setImage(null);
            setExtractedText("");
            if (lastSelectedButton === "gallery") {
              pickImageGallery(); // Re-trigger gallery pick if it was last selected
            } else if (lastSelectedButton === "camera") {
              pickImageCamera();
              setData("");
              setSelectedCountry("");
              setSelectedCountry_1("");
              setSelectedCountry_2("");
              setSelectedCountry_3("");
              setSelectedCountry_4(""); // Re-trigger camera pick if it was last selected
            }
          }}
        />
      )}

      {image && (
        <Animated.Image
          entering={FadeIn.delay(300).duration(2000).springify()}
          source={{ uri: image }}
          style={{
            width: "90%",
            height: 250,
            // objectFit: "contain",
            // marginLeft: 15,
            borderRadius: 20,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 15,
            marginBottom: 45,
          }}
        />
      )}

      {image && (
        <View style={{ flex: 1, zIndex: clicked ? 997 : 1 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: "3%",
              // marginBottom: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onPress={() => {
              setClicked(!clicked);
            }}
          >
            {clicked && (
              <TextInput
                placeholder="Company Name"
                value={search}
                ref={searchRef}
                onChangeText={(txt) => {
                  onSearch(txt);
                  setSearch(txt);
                }}
                style={{
                  width: "96%",
                  height: 50,
                  alignSelf: "center",
                  borderWidth: 0.2,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  // marginTop: 20,
                  // marginBottom: 1
                  paddingLeft: 20,
                  marginLeft: -15,
                }}
              />
            )}
            {!clicked && (
              <Text style={{ fontWeight: "600", top: 10 }}>
                {/* {selectedCountry == "" ? "Company Name" : selectedCountry} */}
                {/* {data[0]} */}
                {domain == null || selectedCountry == ""
                  ? domain || selectedCountry || "Company Name"
                  : selectedCountry}
              </Text>
            )}
            {!clicked && (
              <Text
                style={{
                  fontWeight: "200",
                  top: 5,
                  left: 10,
                  position: "absolute",
                }}
              >
                {"Company Name"}
              </Text>
            )}

            {clicked ? (
              <Image
                source={require("../upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>

          {clicked ? (
            <View
              style={{
                elevation: 5,
                marginTop: 12,
                height: 250,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <FlatList
                data={data}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCountry(item);
                        setClicked(!clicked);
                        onSearch("");
                        setSearch("");
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      {image && (
        <View style={{ flex: 1, zIndex: clicked_1 ? 997 : 1 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
              // mareginBottom: -20,
            }}
            onPress={() => {
              setClicked_1(!clicked_1);
            }}
          >
            {clicked_1 && (
              <TextInput
                placeholder="Person Name"
                value={search_1}
                ref={searchRef}
                onChangeText={(txt) => {
                  onSearch_1(txt);
                  setSearch_1(txt);
                }}
                style={{
                  width: "96%",
                  height: 50,
                  alignSelf: "center",
                  borderWidth: 0.2,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  // marginTop: 20,
                  // marginBottom: 1
                  paddingLeft: 20,
                  marginLeft: -15,
                }}
              />
            )}
            {!clicked_1 && (
              <Text style={{ fontWeight: "600", top: "2%" }}>
                {/* {selectedCountry_1 == "" ? "Person Name" : selectedCountry_1} */}

                {closestMatched == null || selectedCountry_1 == ""
                  ? closestMatched || selectedCountry_1 || "Person Name"
                  : selectedCountry_1}
              </Text>
            )}
            {!clicked_1 && (
              <Text
                style={{
                  fontWeight: "200",
                  top: 3,
                  left: 10,
                  position: "absolute",
                }}
              >
                {"Person Name"}
              </Text>
            )}

            {clicked_1 ? (
              <Image
                source={require("../upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>

          {clicked_1 ? (
            <View
              style={{
                elevation: 5,
                marginTop: 12,
                height: 250,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <FlatList
                data={data_1}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCountry_1(item);
                        setClicked_1(!clicked_1);
                        onSearch_1("");
                        setSearch_1("");
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      {image && (
        <View style={{ flex: 1, zIndex: clicked_2 ? 997 : 1 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onPress={() => {
              setClicked_2(!clicked_2);
            }}
          >
            {clicked_2 && (
              <TextInput
                placeholder="Designation"
                value={search_2}
                ref={searchRef}
                onChangeText={(txt) => {
                  onSearch_2(txt);
                  setSearch_2(txt);
                }}
                style={{
                  width: "96%",
                  height: 50,
                  alignSelf: "center",
                  borderWidth: 0.2,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  // marginTop: 20,
                  // marginBottom: 20,
                  paddingLeft: 20,
                  marginLeft: -15,
                }}
              />
            )}
            {!clicked_2 && (
              <Text style={{ fontWeight: "600", top: "2%" }}>
                {/* {designation == null ? "Designation" : designation} */}
                {designation == null || selectedCountry_2 == ""
                  ? designation || selectedCountry_2 || "Designation"
                  : selectedCountry_2}
              </Text>
            )}
            {!clicked_2 && (
              <Text
                style={{
                  fontWeight: "200",
                  top: 5,
                  left: 10,
                  position: "absolute",
                }}
              >
                {"Designation"}
              </Text>
            )}

            {clicked_2 ? (
              <Image
                source={require("../upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>

          {clicked_2 ? (
            <View
              style={{
                elevation: 5,
                marginTop: 12,
                height: 190,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <FlatList
                data={data_2}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCountry_2(item);
                        setClicked_2(!clicked_2);
                        onSearch_2("");
                        setSearch_2("");
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      {image && (
        <View style={{ flex: 1, zIndex: clicked_3 ? 997 : 1 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onPress={() => {
              setClicked_3(!clicked_3);
            }}
          >
            {clicked_3 && (
              <TextInput
                placeholder="Phone Number"
                value={search_3}
                ref={searchRef}
                onChangeText={(txt) => {
                  onSearch_3(txt);
                  setSearch_3(txt);
                }}
                style={{
                  width: "96%",
                  height: 50,
                  alignSelf: "center",
                  borderWidth: 0.2,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  // marginTop: 20,
                  // marginBottom: 1
                  paddingLeft: 20,
                  marginLeft: -15,
                }}
              />
            )}
            {!clicked_3 && (
              <Text style={{ fontWeight: "600", top: "2%" }}>
                {/* {mobileNumberElement == null
                  ? "Phone Number"
                  : mobileNumberElement} */}
                {mobileNumberElement == null || selectedCountry_3 == ""
                  ? mobileNumberElement || selectedCountry_3 || "Phone Number"
                  : selectedCountry_3}
              </Text>
            )}
            {!clicked_3 && (
              <Text
                style={{
                  fontWeight: "200",
                  top: 5,
                  left: 10,
                  position: "absolute",
                }}
              >
                {"Phone Number"}
              </Text>
            )}

            {clicked_3 ? (
              <Image
                source={require("../upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>

          {clicked_3 ? (
            <View
              style={{
                elevation: 5,
                marginTop: "-62%",
                height: 190,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <FlatList
                data={data_3}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCountry_3(item);
                        setClicked_3(!clicked_3);
                        onSearch_3("");
                        setSearch_3("");
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      {image && (
        <View style={{ flex: 1, zIndex: clicked_4 ? 997 : 1 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: "3%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onPress={() => {
              setClicked_4(!clicked_4);
            }}
          >
            {clicked_4 && (
              <TextInput
                placeholder="Email Address"
                value={search_4}
                ref={searchRef}
                onChangeText={(txt) => {
                  onSearch_4(txt);
                  setSearch_4(txt);
                }}
                style={{
                  width: "96%",
                  height: 50,
                  alignSelf: "center",
                  borderWidth: 0.2,
                  borderColor: "#8e8e8e",
                  borderRadius: 7,
                  // marginTop: 20,
                  // marginBottom: 1
                  paddingLeft: 20,
                  marginLeft: -15,
                }}
              />
            )}
            {!clicked_4 && (
              <Text style={{ fontWeight: "600", top: "2%" }}>
                {/* {"Email Address"} */}
                {/* {email == null ? "Email Address" : email} */}
                {email == null || selectedCountry_4 == ""
                  ? email || selectedCountry_4 || "Email Address"
                  : selectedCountry_4}
              </Text>
            )}
            {!clicked_4 && (
              <Text
                style={{
                  fontWeight: "200",
                  top: 5,
                  left: 10,
                  position: "absolute",
                }}
              >
                {"Email Address"}
              </Text>
            )}

            {clicked_4 ? (
              <Image
                source={require("../upload.png")}
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require("../dropdown.png")}
                style={{ width: 20, height: 20 }}
              />
            )}
          </TouchableOpacity>

          {clicked_4 ? (
            <View
              style={{
                elevation: 5,
                marginTop: "-78%",
                height: 250,
                alignSelf: "center",
                width: "90%",
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <FlatList
                data={data_4}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: "85%",
                        alignSelf: "center",
                        height: 50,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        borderColor: "#8e8e8e",
                      }}
                      onPress={() => {
                        setSelectedCountry_4(item);
                        setClicked_4(!clicked_4);
                        onSearch_4("");
                        setSearch_4("");
                      }}
                    >
                      <Text style={{ fontWeight: "600" }}>{item}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      )}
      {image && (
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonCloseX]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyleX}>X</Text>
                </Pressable>
                {image && (
                  <View style={{ flex: 1, zIndex: clicked_5 ? 997 : 1 }}>
                    <TouchableOpacity
                      style={{
                        width: "90%",
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 0.5,
                        alignSelf: "center",
                        marginTop: "3%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                      onPress={() => {
                        setClicked_5(!clicked_5);
                      }}
                    >
                      {clicked_5 && (
                        <TextInput
                          placeholder="Visitor Type"
                          value={search_5}
                          ref={searchRef}
                          onChangeText={(txt) => {
                            onSearch_5(txt);
                            setSearch_5(txt);
                          }}
                          style={{
                            width: "96%",
                            height: 50,
                            alignSelf: "center",
                            borderWidth: 0.2,
                            borderColor: "#8e8e8e",
                            borderRadius: 7,
                            // marginTop: 20,
                            // marginBottom: 1
                            paddingLeft: 20,
                            marginLeft: -15,
                          }}
                        />
                      )}
                      {!clicked_5 && (
                        <Text style={{ fontWeight: "600", top: "2.5%" }}>
                          {/* {mobileNumberElement == null
                  ? "Phone Number"
                  : mobileNumberElement} */}
                          {selectedCountry_5 == ""
                            ? visitorValue ||
                              selectedCountry_5 ||
                              "Visitor Type"
                            : selectedCountry_5}
                        </Text>
                      )}
                      {!clicked_5 && (
                        <Text
                          style={{
                            fontWeight: "200",
                            top: 5,
                            left: 10,
                            position: "absolute",
                          }}
                        >
                          {"Visitor Type"}
                        </Text>
                      )}

                      {clicked_5 ? (
                        <Image
                          source={require("../upload.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      ) : (
                        <Image
                          source={require("../dropdown.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      )}
                    </TouchableOpacity>

                    {clicked_5 ? (
                      <View
                        style={{
                          elevation: 5,
                          marginTop: "2%",
                          height: 150,
                          alignSelf: "center",
                          width: 250,
                          backgroundColor: "whitesmoke",
                          borderRadius: 10,
                        }}
                      >
                        <FlatList
                          data={VisitorData}
                          renderItem={({ item, index }) => {
                            return (
                              <TouchableOpacity
                                style={{
                                  width: "90%",
                                  alignSelf: "center",
                                  height: 50,
                                  justifyContent: "center",
                                  borderBottomWidth: 0.5,
                                  borderColor: "#8e8e8e",
                                }}
                                onPress={() => {
                                  setSelectedCountry_5(item);
                                  setClicked_5(!clicked_5);
                                  onSearch_5("");
                                  setSearch_5("");
                                }}
                              >
                                <Text style={{ fontWeight: "600" }}>
                                  {item}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </View>
                    ) : null}
                  </View>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    //   handleSaveText();
                    setModalVisible(!modalVisible);
                    setImage(null);
                    navigation.navigate("Thankyou", {
                      scannedData: "",
                    });
                    if (lastSelectedApi === "text") {
                      addExtractedData(); // Re-trigger gallery pick if it was last selected
                    } else if (lastSelectedApi === "table") {
                      // Re-trigger camera pick if it was last selected
                      addExtractedDataTable();
                    }
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
        </View>
      )}

      {image && (
        <View style={styles.scrollViewContainer}>
          {/* <Animated.ScrollView
            entering={FadeIn.delay(400).duration(2000).springify()}
            contentContainerStyle={styles.scrollView}
          >
            <Text style={styles.extractedText}>{extractedText}</Text>
          </Animated.ScrollView> */}

          <Animated.View
            entering={FadeInUp.delay(400).duration(2000).springify()}
          >
            {/* <TouchableOpacity style={styles.opacity1}>
              <Text
                style={styles.text1}
                onPress={() => {
                  //   handleSaveText();
                  navigation.navigate("Thankyou", {
                    scannedData: "",
                  });
                  if (lastSelectedApi === "text") {
                    addExtractedData(); // Re-trigger gallery pick if it was last selected
                  } else if (lastSelectedApi === "table") {
                    // Re-trigger camera pick if it was last selected
                    addExtractedDataTable();
                  }
                }}
              >
                Save Text
              </Text> */}
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.text1}>Next</Text>
            </Pressable>
            {/* </TouchableOpacity> */}
          </Animated.View>
        </View>
      )}
      {/* {image && (
        <View style={styles.scrollViewContainerMultiple}>
          <Animated.ScrollView
            entering={FadeIn.delay(400).duration(2000).springify()}
            contentContainerStyle={styles.scrollView}
          >
            <Text style={styles.extractedText}>{extractedText}</Text>
          </Animated.ScrollView>
        </View>
      )}
      {image && (
        <View style={styles.scrollViewContainerMultiple}>
          <Animated.ScrollView
            entering={FadeIn.delay(400).duration(2000).springify()}
            contentContainerStyle={styles.scrollView}
          >
            <Text style={styles.extractedText}>{extractedText}</Text>
          </Animated.ScrollView>
        </View>
      )}
      {image && (
        <View style={styles.scrollViewContainerMultiple}>
          <Animated.ScrollView
            entering={FadeIn.delay(400).duration(2000).springify()}
            contentContainerStyle={styles.scrollView}
          >
            <Text style={styles.extractedText}>{extractedText}</Text>
          </Animated.ScrollView>
        </View>
      )}
      {image && (
        <View style={styles.scrollViewContainerMultiple}>
          <Animated.ScrollView
            entering={FadeIn.delay(400).duration(2000).springify()}
            contentContainerStyle={styles.scrollView}
          >
            <Text style={styles.extractedText}>{extractedText}</Text>
          </Animated.ScrollView>
        </View>
      )} */}

      {/* {image && (
        <View style={styles.scrollViewContainerButton}>
          <Animated.View
            entering={FadeInUp.delay(400).duration(2000).springify()}
          >
            <TouchableOpacity style={styles.opacity1}>
              <Text
                style={styles.text1}
                onPress={() => {
                  //   handleSaveText();
                  navigation.navigate("Thankyou", {
                    scannedData: "",
                  });
                  if (lastSelectedApi === "text") {
                    addExtractedData(); // Re-trigger gallery pick if it was last selected
                  } else if (lastSelectedApi === "table") {
                    // Re-trigger camera pick if it was last selected
                    addExtractedDataTable();
                  }
                }}
              >
                Save Text
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )} */}

      <StatusBar style="auto" />
      {!image && (
        <View style={styles.container2}>
          <View style={styles.textcontainer}>
            {/* <Animated.View
              entering={FadeInDown.delay(400).duration(2000).springify()}
            >
              <TouchableOpacity style={styles.opacity}>
                <Text style={styles.text} onPress={pickImageGallery}>
                  Pick an image from gallery
                </Text>
              </TouchableOpacity>
            </Animated.View> */}
            <Animated.View
              entering={FadeInDown.delay(400).duration(2000).springify()}
            >
              <TouchableOpacity
                style={styles.opacity}
                // onPress={() => {
                //   pickImageCamera();
                // }}
              >
                <Text
                  style={styles.text}
                  onPress={() => {
                    pickImageCamera();
                  }}
                >
                  Take Visiting Card Photo!
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* <Animated.View
              entering={FadeInDown.delay(600).duration(2000).springify()}
            >
              <TouchableOpacity
                style={styles.opacity}
                onPress={() => {
                  pickImageCameraTable();
                }}
              >
                <Text
                  style={styles.text}
                  onPress={() => {
                    pickImageCameraTable();
                  }}
                >
                  Scan for the Table!
                </Text>
              </TouchableOpacity>
            </Animated.View> */}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // backgroundColor: "white",
  },

  image1: {
    height: "110%",
    width: "100%",
    position: "absolute",
  },
  container2: {
    top: "60%",
  },
  hangs: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  textcontainer: { marginTop: "5%" },
  opacity: {
    width: "80%",
    backgroundColor: "#2196F3",
    padding: 13,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 40,
    // position: "absolute",
    top: 45,
    // width: "100%",
    alignItems: "center",
  },
  opacity1: {
    width: "50%",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 16,
    // marginBottom: 10,
    marginTop: 15,
    marginHorizontal: 40,
    marginLeft: "auto",
    marginRight: "auto",
    // position: "absolute",
    // bottom: 5,
    // width: "100%",
    alignItems: "center",
  },
  opacity3: {
    width: "20%",
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 16,
    // marginBottom: 10,
    marginTop: 55,
    // marginHorizontal: 40,
    // marginLeft: "auto",
    marginRight: "auto",
    // position: "absolute",
    // bottom: 5,
    // width: "100%",
    alignItems: "center",
    zIndex: 1,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: "1%",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  scrollViewContainer: {
    flex: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
  },
  scrollViewContainerMultiple: {
    flex: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0.5%",
  },
  scrollViewContainerButton: {
    flex: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    // marginTop: "1%",
  },
  scrollView: {
    // flexGrow: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    // marginBottom: 20,
  },
  extractedText: {
    fontSize: 16,
    color: "black",
  },
  image4: {
    height: "25%",
    width: "20%",
    position: "absolute",
    marginLeft: "20%",
  },
  image5: {
    marginLeft: "55%",
    height: "35%",
    width: "28%",
    position: "absolute",
  },

  centeredView: {
    // flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "90%",
    // marginLeft: "20%",
    backgroundColor: " rgba(0, 0, 0, 0.5)",
    // marginRight: "20%",
    width: "100%",
    height: "100%",
  },
  modalView: {
    marginTop: "45%",
    height: "28%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
    width: "50%",
    // backgroundColor: "deepskyblue",
    padding: 10,
    borderRadius: 16,
    // marginBottom: 10,
    marginTop: 15,
    marginHorizontal: 40,
    marginLeft: "auto",
    marginRight: "auto",
    // position: "absolute",
    // bottom: 5,
    // width: "100%",
    alignItems: "center",
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginTop: 20,
  },
  buttonCloseX: {
    backgroundColor: "#2196F3",
    // marginTop: 20,
    top: -45,
    left: 145,
    width: "25%",
    borderRadius: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleX: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

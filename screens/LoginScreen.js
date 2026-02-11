import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function LoginScreen() {
  const [userName, setUserName] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [mobileotp, setmobileotp] = useState(null);
  const [validTill, setValidTill] = useState("");

  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showOtpButton, setShowOtpButton] = useState(false);
  const [otp, setOtp] = useState("");
  // const [hasPermission, setHasPermission] = useState(null);
  // const [scanned, setScanned] = useState(false);
  // const [text, setText] = useState("Not yet Scanned");
  // const askForCameraPermission = () => {
  //   async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status == "granted");
  //   };
  // };
  // useEffect(() => {
  //   askForCameraPermission();
  // }, []);
  // const handleBarCodScanned = ({ type, data }) => {
  //   setScanned(true);
  //   setText(data);
  // };
  // if (hasPermission === null) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Requesting for camera permission</Text>
  //     </View>
  //   );
  // }
  // if (hasPermission == false) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ margin: 10 }}>No access to camera</Text>
  //       <Button
  //         title={"Allow Camera"}
  //         onPress={() => {
  //           askForCameraPermission();
  //         }}
  //       />
  //     </View>
  //   );
  // }
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        // setShowAlert(false);
        navigation.navigate("Camera", {
          user_name: userName,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigation, userName]);

  const navigation = useNavigation();
  // console.log("userName", userName);
  // console.log("Password", password);
  const handleLogin = () => {
    // setShowAlert(true);
    // Alert.alert(`Welcome to the App! ${userName}`);
    // nextPage();
  };
  // const nextPage = () => {
  //   navigation.navigate("Camera", {
  //     user_name: userName,
  //     password_: password,
  //   });
  // };
  const fetchData = async (employee_id) => {
    if (employee_id === "") {
      return Alert.alert("Please Fill the correct Employee Id");
    }
    const url = "https://l550274-iflmap.hcisbp.ae1.hana.ondemand.com/http/QR";
    const raw = `<ID>${employee_id}</ID>`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    myHeaders.append(
      "Authorization",
      "Basic dmluYXluYW5kYUB0cmlkZW50aW5kaWEuY29tOkNvbUAxNTY3ODk="
    );
    myHeaders.append(
      "Cookie",
      "JSESSIONID=6528404F82D6298ECDF6DC7C377516CBD177065166A099F45DBD50645985EF08; JTENANTSESSIONID_l685c02b2=94G1zqudD%2BKl5t7bF5zmIzE7zPaklYxdJ3BnPcdV6vE%3D; BIGipServerl550274iflmapavtae1cpip.factoryae1.customdomain=!FbTJwrjyI/EXOUUTBeiY35OSlmNN+u/OLbUBGCAACdm8P4stfYDGqY4bFJ84IrN+e30pClNaAA1NPBY="
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log(result);
      const data = JSON.parse(result);
      const displayName =
        data?.EmpEmployment?.EmpEmployment?.personNav?.PerPerson
          ?.personalInfoNav?.PerPersonal?.displayName;
      const mobileNumber =
        data?.EmpEmployment?.EmpEmployment?.personNav?.PerPerson?.phoneNav?.PerPhone?.find(
          (phone) => phone.phoneTypeNav?.PicklistOption?.localeLabel === "Work"
        )?.phoneNumber;
      console.log("mobileNumber fetchData", mobileNumber);
      if (mobileNumber == null || mobileNumber == "") {
        return Alert.alert("Please Fill the correct Employee Id");
      }

      generateOtp(mobileNumber);
      setShowOtpForm(true);
      setShowOtpButton(true);
      // Handle result as needed (e.g., update state)
    } catch (error) {
      console.error(error);
      // Handle errors gracefully
    }
  };
  const generateOtp = (mobileNumber) => {
    // Generate a random 6-digit number
    const sixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    console.log("otp", sixDigitNumber);

    // Convert the number to a string and set it as the OTP state
    setmobileotp(sixDigitNumber.toString());
    const currentDate = new Date();
    console.log("mobileotpfirst", mobileotp);
    // Add 4 minutes to the current time
    const validTillDate = new Date(currentDate.getTime() + 4 * 60000); // 4 minutes in milliseconds

    // Format valid till date
    const formattedValidTill = validTillDate.toISOString();

    // Set valid till date
    setValidTill(formattedValidTill);
    console.log("mobileotp", sixDigitNumber);
    console.log("mobileNumber", mobileNumber);
    // Make HTTP request to send OTP
    fetch("http://smsjust.com/sms/user/urlsms.php", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=tridentindia&pass=tridentindia@1&senderid=TGROUP&message=Dear User,Your Login Code is ${sixDigitNumber}.Regards,Trident Group&dest_mobileno=${mobileNumber}&msgtype=TXT&response=Y`,
    })
      .then((response) => response.text())
      .then((data) => console.log(data)) // Log response
      .catch((error) => console.error("Error:", error)); // Log error
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.container}>
    //     <BarCodeScanner
    //       onBarCodeScanned={scanned ? undefined : handleBarCodScanned}
    //     />
    //   </View>
    //   <Text style={styles.maintext}>{data}</Text>
    //   {scanned && (
    //     <Button
    //       title={"Scan again?"}
    //       onPress={() => setScanned(false)}
    //       color="tomato"
    //     />
    //   )}
    // </View>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Animated.View
          entering={FadeIn.delay(600).duration(2000).springify()}
          style={styles.tricontainer}
        >
          <Animated.Image
            entering={FadeInUp.delay(300).duration(1000).springify().damping(3)}
            style={styles.imagetripic}
            source={require("../assets/tripic.png")}
          />
        </Animated.View>
        <Image
          style={styles.image1}
          source={require("../assets/background.png")}
        />
        <View style={styles.hangs}>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}
            style={styles.image2}
            source={require("../assets/light.png")}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}
            style={styles.image3}
            source={require("../assets/light.png")}
          />
        </View>
        <View style={styles.container2}>
          <View style={styles.titlecontainer}>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify().damping(3)}
              style={styles.title}
            >
              Login
            </Animated.Text>
          </View>

          <View style={styles.formvalue}>
            <Animated.View
              entering={FadeInDown.delay(200).duration(2000).springify()}
              style={styles.formvalue2}
            >
              <TextInput
                onChangeText={(currentData) => {
                  setUserName(currentData);
                }}
                placeholder="Username"
                placeholderTextColor={"gray"}
              />
            </Animated.View>
            {showOtpForm && (
              <Animated.View
                entering={FadeInDown.delay(400).duration(2000).springify()}
                style={styles.formvalue2}
              >
                <TextInput
                  onChangeText={(currentData) => {
                    setOtp(currentData);
                  }}
                  placeholder="OTP Number"
                  placeholderTextColor={"gray"}
                  // secureTextEntry
                />
              </Animated.View>
            )}
            {!showOtpButton && (
              <Animated.View
                entering={FadeInDown.delay(600).duration(2000).springify()}
                style={styles.buttoncontainer}
              >
                <Pressable style={styles.opacity}>
                  <Text
                    onPress={() => {
                      fetchData(userName);
                      // navigation.navigate("Camera", {
                      //   user_name: userName,
                      //   password_: password,
                      // });
                    }}
                    style={styles.text}
                  >
                    Next
                  </Text>
                </Pressable>
              </Animated.View>
            )}

            {showOtpForm && (
              <Animated.View
                entering={FadeInDown.delay(600).duration(2000).springify()}
                style={styles.buttoncontainer}
              >
                <Pressable style={styles.opacity}>
                  <Text
                    onPress={() => {
                      // fetchData(userName);
                      if (otp === mobileotp) {
                        navigation.navigate("Camera", {
                          user_name: userName,
                        });
                        setShowOtpForm(false);
                        setShowOtpButton(false);
                      } else {
                        Alert.alert("username or otp is wrong!");
                      }
                    }}
                    style={styles.text}
                  >
                    Login
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // flex: 1,
    // backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  image1: {
    height: "130%",
    width: "100%",
    position: "absolute",
  },
  hangs: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  image2: {
    height: "23%",
    width: "20%",
    position: "absolute",
    marginLeft: "23%",
  },
  image3: {
    marginLeft: "55%",
    height: "30%",
    width: "26%",
    position: "absolute",
  },
  tricontainer: {
    backgroundColor: "#e6faff",
    // padding: 15,

    // marginBottom: 10,
    // marginTop: 10,
    // marginHorizontal: 43,
    borderRadius: 16,
    marginTop: 65,
    marginLeft: "12.5%",
    // marginLeft: "auto",
    // marginRight: "auto",
    height: "5%",
    width: "75%",
    position: "absolute",
    zIndex: 1,
  },
  container2: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  titlecontainer: {
    display: "flex",
    alignItems: "center",
  },
  imagetripic: {
    // marginTop: 3,
    marginLeft: 20,
    height: "85%",
    width: "90%",
    position: "absolute",
    zIndex: 1,
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 50,
    color: "white",
    marginTop: "35%",
  },
  formvalue: {
    display: "flex",
    alignItems: "center",
    marginHorizontal: 4,
    margin: "-10%",
  },
  formvalue2: {
    backgroundColor: "gainsboro",
    padding: 20,
    borderRadius: 16,
    width: "80%",
    marginTop: 10,
  },
  buttoncontainer: {
    width: "100%",
  },
  opacity: {
    width: "80%",
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    marginTop: 10,
    // marginHorizontal: 43,
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

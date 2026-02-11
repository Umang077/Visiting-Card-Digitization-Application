// const [data_1, setData_1] = useState(jsonData.text);
//   const [data_2, setData_2] = useState(jsonData.text);
//   const [data_3, setData_3] = useState(jsonData.text);
//   const [data_4, setData_4] = useState(jsonData.text);

// const [clicked_1, setClicked_1] = useState(false);
//   const [clicked_2, setClicked_2] = useState(false);
//   const [clicked_3, setClicked_3] = useState(false);
//   const [clicked_4, setClicked_4] = useState(false);

// const [search_1, setSearch_1] = useState("");
// const [search_2, setSearch_2] = useState("");
// const [search_3, setSearch_3] = useState("");
// const [search_4, setSearch_4] = useState("");

// const [selectedCountry_1, setSelectedCountry_1] = useState("");
// const [selectedCountry_2, setSelectedCountry_2] = useState("");
// const [selectedCountry_3, setSelectedCountry_3] = useState("");
// const [selectedCountry_4, setSelectedCountry_4] = useState("");

// const onSearch_1 = (search) => {
//     if (search !== "") {
//       let tempData = data_1.filter((item) => {
//         return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
//       });
//       setData_1(tempData);
//     } else {
//       setData_1(jsonData.text);
//     }
//   };
//   const onSearch_2 = (search) => {
//     if (search !== "") {
//       let tempData = data_2.filter((item) => {
//         return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
//       });
//       setData_2(tempData);
//     } else {
//       setData_2(jsonData.text);
//     }
//   };
//   const onSearch_3 = (search) => {
//     if (search !== "") {
//       let tempData = data_3.filter((item) => {
//         return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
//       });
//       setData_3(tempData);
//     } else {
//       setData_3(jsonData.text);
//     }
//   };
//   const onSearch_4 = (search) => {
//     if (search !== "") {
//       let tempData = data_4.filter((item) => {
//         return item.toLowerCase().indexOf(search.toLowerCase()) > -1;
//       });
//       setData_4(tempData);
//     } else {
//       setData_4(jsonData.text);
//     }
//   };

// {image && (
//     <View style={{ flex: 1, zIndex: clicked_1 ? 997 : 1 }}>
//       <TouchableOpacity
//         style={{
//           width: "90%",
//           height: 50,
//           borderRadius: 10,
//           borderWidth: 0.5,
//           alignSelf: "center",
//           marginTop: "3%",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingLeft: 15,
//           paddingRight: 15,
//           // mareginBottom: -20,
//         }}
//         onPress={() => {
//           setClicked_1(!clicked_1);
//         }}
//       >
//         {clicked_1 && (
//           <TextInput
//             placeholder="Search.."
//             value={search_1}
//             ref={searchRef}
//             onChangeText={(txt) => {
//               onSearch_1(txt);
//               setSearch_1(txt);
//             }}
//             style={{
//               width: "96%",
//               height: 50,
//               alignSelf: "center",
//               borderWidth: 0.2,
//               borderColor: "#8e8e8e",
//               borderRadius: 7,
//               // marginTop: 20,
//               // marginBottom: 1
//               paddingLeft: 20,
//               marginLeft: -15,
//             }}
//           />
//         )}
//         {!clicked_1 && (
//           <Text style={{ fontWeight: "600" }}>
//             {selectedCountry_1 == "" ? "Person Name" : selectedCountry_1}
//           </Text>
//         )}

//         {clicked_1 ? (
//           <Image
//             source={require("../upload.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         ) : (
//           <Image
//             source={require("../dropdown.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         )}
//       </TouchableOpacity>

//       {clicked_1 ? (
//         <View
//           style={{
//             elevation: 5,
//             marginTop: 12,
//             height: 250,
//             alignSelf: "center",
//             width: "90%",
//             backgroundColor: "#fff",
//             borderRadius: 10,
//           }}
//         >
//           <FlatList
//             data={data_1}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: "85%",
//                     alignSelf: "center",
//                     height: 50,
//                     justifyContent: "center",
//                     borderBottomWidth: 0.5,
//                     borderColor: "#8e8e8e",
//                   }}
//                   onPress={() => {
//                     setSelectedCountry_1(item);
//                     setClicked_1(!clicked_1);
//                     onSearch_1("");
//                     setSearch_1("");
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       ) : null}
//     </View>
//   )}
//   {image && (
//     <View style={{ flex: 1, zIndex: clicked_2 ? 997 : 1 }}>
//       <TouchableOpacity
//         style={{
//           width: "90%",
//           height: 50,
//           borderRadius: 10,
//           borderWidth: 0.5,
//           alignSelf: "center",
//           marginTop: "3%",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingLeft: 15,
//           paddingRight: 15,
//         }}
//         onPress={() => {
//           setClicked_2(!clicked_2);
//         }}
//       >
//         {clicked_2 && (
//           <TextInput
//             placeholder="Search.."
//             value={search_2}
//             ref={searchRef}
//             onChangeText={(txt) => {
//               onSearch_2(txt);
//               setSearch_2(txt);
//             }}
//             style={{
//               width: "96%",
//               height: 50,
//               alignSelf: "center",
//               borderWidth: 0.2,
//               borderColor: "#8e8e8e",
//               borderRadius: 7,
//               // marginTop: 20,
//               // marginBottom: 20,
//               paddingLeft: 20,
//               marginLeft: -15,
//             }}
//           />
//         )}
//         {!clicked_2 && (
//           <Text style={{ fontWeight: "600" }}>
//             {selectedCountry_2 == "" ? "Phone Number" : selectedCountry_2}
//           </Text>
//         )}

//         {clicked_2 ? (
//           <Image
//             source={require("../upload.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         ) : (
//           <Image
//             source={require("../dropdown.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         )}
//       </TouchableOpacity>

//       {clicked_2 ? (
//         <View
//           style={{
//             elevation: 5,
//             marginTop: 12,
//             height: 190,
//             alignSelf: "center",
//             width: "90%",
//             backgroundColor: "#fff",
//             borderRadius: 10,
//           }}
//         >
//           <FlatList
//             data={data_2}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: "85%",
//                     alignSelf: "center",
//                     height: 50,
//                     justifyContent: "center",
//                     borderBottomWidth: 0.5,
//                     borderColor: "#8e8e8e",
//                   }}
//                   onPress={() => {
//                     setSelectedCountry_2(item);
//                     setClicked_2(!clicked_2);
//                     onSearch_2("");
//                     setSearch_2("");
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       ) : null}
//     </View>
//   )}
//   {image && (
//     <View style={{ flex: 1, zIndex: clicked_3 ? 997 : 1 }}>
//       <TouchableOpacity
//         style={{
//           width: "90%",
//           height: 50,
//           borderRadius: 10,
//           borderWidth: 0.5,
//           alignSelf: "center",
//           marginTop: "3%",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingLeft: 15,
//           paddingRight: 15,
//         }}
//         onPress={() => {
//           setClicked_3(!clicked_3);
//         }}
//       >
//         {clicked_3 && (
//           <TextInput
//             placeholder="Search.."
//             value={search_3}
//             ref={searchRef}
//             onChangeText={(txt) => {
//               onSearch_3(txt);
//               setSearch_3(txt);
//             }}
//             style={{
//               width: "96%",
//               height: 50,
//               alignSelf: "center",
//               borderWidth: 0.2,
//               borderColor: "#8e8e8e",
//               borderRadius: 7,
//               // marginTop: 20,
//               // marginBottom: 1
//               paddingLeft: 20,
//               marginLeft: -15,
//             }}
//           />
//         )}
//         {!clicked_3 && (
//           <Text style={{ fontWeight: "600" }}>
//             {selectedCountry_3 == "" ? "Email Address" : selectedCountry_3}
//           </Text>
//         )}

//         {clicked_3 ? (
//           <Image
//             source={require("../upload.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         ) : (
//           <Image
//             source={require("../dropdown.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         )}
//       </TouchableOpacity>

//       {clicked_3 ? (
//         <View
//           style={{
//             elevation: 5,
//             marginTop: "-62%",
//             height: 190,
//             alignSelf: "center",
//             width: "90%",
//             backgroundColor: "#fff",
//             borderRadius: 10,
//           }}
//         >
//           <FlatList
//             data={data_3}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: "85%",
//                     alignSelf: "center",
//                     height: 50,
//                     justifyContent: "center",
//                     borderBottomWidth: 0.5,
//                     borderColor: "#8e8e8e",
//                   }}
//                   onPress={() => {
//                     setSelectedCountry_3(item);
//                     setClicked_3(!clicked_3);
//                     onSearch_3("");
//                     setSearch_3("");
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       ) : null}
//     </View>
//   )}
//   {image && (
//     <View style={{ flex: 1, zIndex: clicked_4 ? 997 : 1 }}>
//       <TouchableOpacity
//         style={{
//           width: "90%",
//           height: 50,
//           borderRadius: 10,
//           borderWidth: 0.5,
//           alignSelf: "center",
//           marginTop: "3%",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingLeft: 15,
//           paddingRight: 15,
//         }}
//         onPress={() => {
//           setClicked_4(!clicked_4);
//         }}
//       >
//         {clicked_4 && (
//           <TextInput
//             placeholder="Search.."
//             value={search_4}
//             ref={searchRef}
//             onChangeText={(txt) => {
//               onSearch_4(txt);
//               setSearch_4(txt);
//             }}
//             style={{
//               width: "96%",
//               height: 50,
//               alignSelf: "center",
//               borderWidth: 0.2,
//               borderColor: "#8e8e8e",
//               borderRadius: 7,
//               // marginTop: 20,
//               // marginBottom: 1
//               paddingLeft: 20,
//               marginLeft: -15,
//             }}
//           />
//         )}
//         {!clicked_4 && (
//           <Text style={{ fontWeight: "600" }}>
//             {selectedCountry_4 == "" ? "Address" : selectedCountry_4}
//           </Text>
//         )}

//         {clicked_4 ? (
//           <Image
//             source={require("../upload.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         ) : (
//           <Image
//             source={require("../dropdown.png")}
//             style={{ width: 20, height: 20 }}
//           />
//         )}
//       </TouchableOpacity>

//       {clicked_4 ? (
//         <View
//           style={{
//             elevation: 5,
//             marginTop: "-78%",
//             height: 250,
//             alignSelf: "center",
//             width: "90%",
//             backgroundColor: "#fff",
//             borderRadius: 10,
//           }}
//         >
//           <FlatList
//             data={data_4}
//             renderItem={({ item, index }) => {
//               return (
//                 <TouchableOpacity
//                   style={{
//                     width: "85%",
//                     alignSelf: "center",
//                     height: 50,
//                     justifyContent: "center",
//                     borderBottomWidth: 0.5,
//                     borderColor: "#8e8e8e",
//                   }}
//                   onPress={() => {
//                     setSelectedCountry_4(item);
//                     setClicked_4(!clicked_4);
//                     onSearch_4("");
//                     setSearch_4("");
//                   }}
//                 >
//                   <Text style={{ fontWeight: "600" }}>{item}</Text>
//                 </TouchableOpacity>
//               );
//             }}
//           />
//         </View>
//       ) : null}
//     </View>
//   )}

import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#00FFFF"
  },
  ParentBox: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  logoBox: {
    width: RFPercentage(35),
    height: RFPercentage(35),
    backgroundColor: "rgba(0, 175, 181, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(50)
  },
  logoParent: {
    width: RFPercentage(35),
    height: RFPercentage(35),
    alignItems: "center",
    justifyContent: "center"
  },
  buttonBox: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  apiBox: {
    width: "65%",
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    top: 20
  },
  TextStylings: {
    color: "#FFF",
    fontSize: RFPercentage(6),
    fontFamily: "NicotineRegular",
    transform: [{ rotate: "-8deg" }]
  },
  LoginButton: {
    backgroundColor: "rgba(0, 175, 181, 1)",
    height: RFPercentage(8),
    width: RFPercentage(20),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(20)
  },
  Logo: {
    height: RFPercentage(60),
    width: RFPercentage(60),
    position: "absolute",
    zIndex: 1,
    top: RFPercentage(-12)
  },
  Icons: {
    marginBottom: 25,
    flexDirection: "row"
  }
});

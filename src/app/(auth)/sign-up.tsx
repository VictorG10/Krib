import { useAuth, useSignUp, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const SignUp = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    if (error) {
      Alert.alert("Sign Up Error", error.message);
      // console.error(JSON.stringify(error.message, null, 2));
      console.error("Sign Up Error", error.message);
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
    console.log(`${user} is just signed up`);
  };

  const onVerifyPress = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Verify your account
        </Text>
        <Text className="text-gray-500 mb-8">
          We sent a verification code to {email}.
        </Text>

        <TextInput
          placeholder="Enter Verification Code"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          className="w-full border border-gray-300 rounded-xl py-3 px-4 mb-4 "
          value={code}
          onChangeText={setCode}
        />

        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4 "
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-600 ">I need a new code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center px-6 py-12">
        <Image
          source={require("../../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create account
        </Text>
        <Text className="text-gray-500 mb-8">Find your dream home today</Text>

        <View className="flex-row gap-3 mb-4">
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            className="flex-1 border border-gray-300 rounded-xl py-3 px-4 "
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            className="flex-1 border border-gray-300 rounded-xl py-3 px-4 "
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 "
            value={email}
            onChangeText={setEmail}
          />
          {errors.fields?.emailAddress && (
            <Text className="text-red-500 mb-4">
              {errors.fields.emailAddress.message}
            </Text>
          )}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 "
            value={password}
            onChangeText={setPassword}
          />
          {errors.fields?.password && (
            <Text className="text-red-500 mb-4">
              {errors.fields.password.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={onSignUpPress}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4 "
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Sign Up</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text className="text-blue-600 font-bold">Sign in</Text>
          </TouchableOpacity>
        </View>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
};

export default SignUp;

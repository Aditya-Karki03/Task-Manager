import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import signupSchema, { signUpDataType } from "../../schema/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpDataType>({
    resolver: zodResolver(signupSchema),
  });
  const submit: SubmitHandler<signUpDataType> = (values) => {
    console.log(values);
  };
  return (
    <div className="grid grid-cols-2 h-screen w-screen">
      <div className="bg-blue-400">
        It will contain a carousel with images preview of the application
      </div>
      <div className="">
        <div className="p-2 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold my-4">
            Hi! Welcome to your own task manager
          </h1>
          <form
            onSubmit={handleSubmit(submit)}
            className="w-3/4  px-4 space-y-2"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                {...register("email")}
                className={`border px-2 py-2 rounded-md outline-none text-md ${
                  errors?.email ? "border-red-500" : "border-black/20"
                }`}
              />
              {errors?.email && (
                <p className="text-red-500">{errors?.email?.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                {...register("password")}
                className={`border border-black/10 px-2 py-2 rounded-md outline-none text-md ${
                  errors?.password ? "border-red-500" : "border-black/20"
                }`}
              />
              {errors?.password && (
                <p className="text-red-500">{errors?.password?.message}</p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" py-2 w-full  bg-red-400 text-white rounded-md my-3 cursor-pointer hover:bg-red-500"
              >
                Verify
              </button>
            </div>
          </form>
          <Divider style={{ borderColor: "#000000" }}>OR</Divider>
          <div className="w-3/4 flex justify-center">
            <button className="bg-black/10 w-full mx-2 py-3 border border-black/10 rounded-md cursor-pointer flex gap-2.5 justify-center hover:bg-black/15 ">
              <GoogleOutlined />
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

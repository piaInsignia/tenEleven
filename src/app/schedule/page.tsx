"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "../component/TextInput";
import Select from "../component/SelectInput";
import { images } from "@/lib/image";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  mobileNumber: z.string().min(1, "Mobile number required"),
  industry: z.string().min(1, "Full Name is required"),
  companySize: z.string(),
  purpose: z.string(),
  solution: z.string(),
  priceRange: z.string(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Schedule() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("purpose") ?? "";
  console.log(keyword);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      industry: "",
      companySize: "",
      purpose: "",
      solution: "",
      priceRange: "",
    },
  });

  useEffect(() => {
    if (keyword) {
      return setValue("purpose", keyword);
    }
    return setValue("purpose", "");
  }, [keyword, setValue]);

  const purpose = watch("purpose");

  const onSubmit = (data: FormValues) => {
    console.log(data);

    // mutation.mutate(data);
  };

  const purposeOptions = [
    {
      value: "Specific Solution",
      label: "Specific Solution",
    },
    // { value: "personal", label: "Personal" },
  ];

  return (
    <div className="relative min-h-screen bg-white font-inter ">
      <div className="pl-5 pr-5 pt-25 sm:pt-0 sm:pl-20 sm:pr-10">
        <div className="relative sm:bg-[url('/assets/bg_schedule.png')] bg-no-repeat w-[100%] h-[86%] bg-right top-1">
          <div className="text-black h-50 sm:h-150 flex flex-col gap-3 md:gap-5 lg:gap-10 justify-center items-start">
            <div className="flex flex-col gap-2 sm:gap-0">
              <p className="text-sm sm:text-[18px]">Get in Touch</p>
              <h1 className="w-full text-[28px] sm:text-5xl font-[500]  leading-[110%] sm:leading-[130%] tracking-normal">
                <span className="inline">Tell Us Your Vision, We’ll</span>
                <span className="inline sm:block"> Map the Way</span>
              </h1>
            </div>
            <p className="text-[#7D7D9D] tracking-[.01em]  w-[300px] sm:w-[500px] text-sm sm:text-lg font-[400]">
              Let us craft on excellent AI strategy that fits your needs.
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full aspect-[12/10] sm:hidden">
        <Image
          src={images.IMG_BG_SCHEDULE}
          alt="img-schedule"
          fill
          className="object-contain object-center"
        />
      </div>
      <div className="px-5 sm:px-20 mb-20">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col gap-5">
              <TextInput
                label="Full Name"
                placeholder="Input name"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <TextInput
                label="Business Email Addrees"
                type="email"
                placeholder="Input email"
                error={errors.email?.message}
                {...register("email")}
              />{" "}
              <TextInput
                label="Mobile Number"
                placeholder="Input number"
                error={errors.mobileNumber?.message}
                {...register("mobileNumber")}
              />{" "}
              <TextInput
                label="Industry"
                placeholder="Input industry"
                error={errors.industry?.message}
                {...register("industry")}
              />
              <TextInput
                label="Company Size"
                placeholder="Input company size"
                error={errors.companySize?.message}
                {...register("companySize")}
              />
            </div>
            <div>
              <div className="flex flex-col gap-5">
                <Controller
                  name="purpose"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      options={purposeOptions}
                      label="Purpose"
                      placeholder="Choose purpose"
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {purpose && (
                  <>
                    <Controller
                      name="solution"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            {
                              value: "Specific Solution",
                              label: "Specific Solution",
                            },
                          ]}
                          label="Solution"
                          placeholder="Choose solution"
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error?.message}
                        />
                      )}
                    />

                    <Controller
                      name="priceRange"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            {
                              value: "Specific Solution",
                              label: "Specific Solution",
                            },
                          ]}
                          label="Range Price Expectation"
                          placeholder="Choose Range"
                          value={field.value}
                          onChange={field.onChange}
                          error={fieldState.error?.message}
                        />
                      )}
                    />
                  </>
                )}
              </div>

              <div className="flex flex-col gap-5 py-8">
                <div
                  className={`flex flex-col gap-5 ${purpose ? "hidden" : ""}`}
                >
                  <h5 className="text-3xl font-medium">Let’s Talk First</h5>
                  <p className="text-[16px] text-[#7D7D9D]">
                    Not sure where to start? That’s totally fine!
                  </p>
                  <p className="text-[16px] text-[#7D7D9D]">
                    Share a bit about your challenges, ideas, or innovations.
                    Our team will help you figuring out the best AI-powered
                    solution.
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-[#F05125] hover:bg-orange-600 text-white px-6 py-3 text-center rounded-full w-full sm:w-fit "
                >
                  Schedule a Session
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full  bg-[#F6F7FB] px-5 py-10 sm:px-20 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-0">
          <div className="flex flex-col justify-start gap-5 ">
            <p>Contact Info</p>
            <h4 className="text-3xl sm:text-4xl flex flex-col font-medium">
              <span>We are always happy </span>
              <span> to assist you</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 pt-5 gap-15 sm:gap-4">
            <div className="text-[18px] font-bold flex flex-col gap-5">
              <span>Email Address</span>
              <div className="w-[20px] h-[1px] border-1 border-black"></div>
              <span>sales@insignia.co.id</span>
              <div className="text-[16px] font-normal text-[#7D7D9D]">
                <p>Assistance hours: </p>
                <p>Monday - Friday 6 am to 8 pm</p>
              </div>
            </div>
            <div className="text-[18px] font-bold flex flex-col gap-5">
              <span>Number</span>
              <div className="w-[20px] h-[1px] border-1 border-black"></div>
              <span>(021) 50880227</span>
              <div className="text-[16px] font-normal text-[#7D7D9D]">
                <p>Assistance hours: </p>
                <p>Monday - Friday 6 am to 8 pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { z } from "zod";

export const createPackageFields = ["name", "price", "startDate", "endDate", "count", "maxPersons", "country", "city", "streetName", "zipCode", "state",  "description" ];

const PackageBaseSchema = z
.object({
  name: z.string().nonempty({ message: "Required"}),
  price: z.number().positive(),
  activities: z.array(z.string()).min(1),
  startDate: z.string().nonempty({ message: "Required"}),
  endDate: z.string().nonempty({ message: "Required"}),
  count: z.number().positive(),
  maxPersons: z.number().positive(),
  country: z.string().nonempty({ message: "Required"}),
  city: z.string().nonempty({ message: "Required"}),
  streetName: z.string().nonempty({ message: "Required"}),
  zipCode: z.string().nonempty({ message: "Required"}),
  state: z.string().nonempty({ message: "Required"}),
  description: z.string().nonempty({ message: "Required"}),
});
export const PackageCreateSchema = PackageBaseSchema.superRefine((data, ctx) => {
    if ( new Date(data.startDate) > new Date(data.endDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "startDate is greater than endDate",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "endDate is smaller than startDate",
      });
    }
  });


export type PackageCreateModel = z.infer<typeof PackageCreateSchema>;

export const PackageDetailReadSchema =PackageBaseSchema.extend({
  id: z.number().positive(),
  adminId: z.number().positive(),
  locationId: z.number().positive(),
  created: z.string().nonempty({ message: "Required"}),
}).superRefine((data, ctx) => {
  if ( new Date(data.startDate) > new Date(data.endDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["startDate"],
      message: "startDate is greater than endDate",
    });
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "endDate is smaller than startDate",
    });
  }
});

export type PackageDetailReadModel = z.infer<typeof PackageDetailReadSchema>;

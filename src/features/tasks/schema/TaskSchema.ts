import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(3, "عنوان تسک باید حداقل 3 کاراکتر باشد"),
  description: z.string().min(3, "توضیحات تسک باید حداقل 3 کاراکتر باشد"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  label: z.string().min(3, "برچسب تسک باید حداقل 3 کاراکتر باشد"),
});
export type TaskFormValues = z.infer<typeof taskSchema>;

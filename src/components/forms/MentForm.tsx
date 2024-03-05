import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MentValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { useCreateMent } from "@/lib/react-query/queries"
import { createMent } from "@/lib/appwrite/api"
import { useUserContext } from "@/context/AuthContext"
import { toast, useToast } from "../ui"
 
type MentFormProps = {
  ment?: Models.Document;
}

const MentForm = ({ ment }: MentFormProps ) => {
  const { mutateAsync: CreateMent} = useCreateMent();
  const { user } = useUserContext();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof MentValidation>>({
    resolver: zodResolver(MentValidation),
    defaultValues: {
      comment: ment ? ment?.comment : "",
    },
  })
 
  // 2. Define a submit handler.
  async function handleSubmit(values: z.infer<typeof MentValidation>) {
    const newMent = await createMent({
      ...values,
      username: user.name,
    });
    
    if(!newMent) {
      toast({
        title: 'Try Again'
      })
    }
    console.log(newMent)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default MentForm
'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Form } from "@base-ui/react"

export default function SignUpPage() {

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries())
        console.log(user)

    }
  return (
    <div>
            <Form onSubmit={handleSubmit}>
            <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" name="name" placeholder="Jordan Lee" type="text" />
      </Field>

        <Field>
        <FieldLabel htmlFor="fieldgroup-name">Email</FieldLabel>
        <Input id="fieldgroup-name" name="email" placeholder="Jordan Lee" type="email" />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-name">PhotoURL</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" name="photo" type="text" />
      </Field>

      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
        <Input id="fieldgroup-name" placeholder="Jordan Lee" name="password" type="password"/>
      </Field>

      <Field orientation="horizontal">
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
    </Form>
    </div>


  )
}

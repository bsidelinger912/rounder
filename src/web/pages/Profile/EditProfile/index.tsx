/**
 * @class EditProfile
 * @description 
 */

import * as React from "react";

import { IProfile } from "src/api/app/schemas/profile/types";
import { Form, Field, Text, FormData } from "src/web/components/Form";

const styles = require('./editProfile.scss');

export interface Props {
  profile: IProfile;
}

const EditProfile: React.SFC<Props> = () => {
  return (
    <div className={styles.main}>
       <Form
        onSubmit={(data: FormData) => { console.log(data);}}
       >
         <Field field="name" label="Name" compact={true}>
           <Text />
         </Field>

         <Field field="description" label="Description" compact={true}>
           <Text />
         </Field>

         <div>
          <button className="button-primary" type="submit">Save</button>
         </div>
       </Form>
    </div>
  );
};

export default EditProfile;
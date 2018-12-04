/**
 * @class ProfileForm
 * @description 
 */

import * as React from "react";
import { ApolloError } from "apollo-boost";

import { Form, Field, Text, FormData, FormError } from "src/web/components/Form";
import { IItineraryInput, IItinerary } from "src/api/app/schemas/itinerary/types";

// const styles = require('./itineraryForm.scss');

interface UpdateItineraryArgs {
  variables: any; // TODO see how to do this right
}

export interface Props {
  submit(args: UpdateItineraryArgs): Promise<any>;
  onSuccess?(data?: IItineraryInput): void;
  data: IItinerary | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  itinerary?: IItinerary;
  profileId?: string;
}

interface State {
}

class ProfileForm extends React.Component<Props, State> {
  private onSubmit: (data: FormData) => Promise<void> = async (data) => {
    const { itinerary, submit, onSuccess, profileId } = this.props;

    const variables = itinerary 
      ? { id: itinerary.id, input: data as IItineraryInput }
      : { input: data as IItineraryInput, profileId: profileId as string }; // TODO: update props typings to avoid cast here

    console.log(variables);
    
    try {
      await submit({ variables });
      onSuccess && onSuccess(data as IItineraryInput);
    } catch(e) {

    }
  }

  public render():JSX.Element {
    const { itinerary, error, loading } = this.props;

    const errorElement = error && <FormError>{error.message}</FormError>;

    const button = loading ? (
      <div>
        <button className="button-primary" type="submit" disabled>Loading...</button>
      </div>
    ) : (
      <div>
        <button className="button-primary" type="submit">Save</button>
      </div>
    );

    return (
      <div>
        <Form
          onSubmit={this.onSubmit}
        >
          <Field field="name" label="Name">
            <Text value={itinerary && itinerary.name} />
          </Field>

          <Field field="description" label="Description">
            <Text value={itinerary && itinerary.description} />
          </Field>

          {errorElement}

          {button}
        </Form>
      </div>
    );
  }
}

export default ProfileForm;
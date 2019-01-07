declare namespace Mollie {
  interface ICustomer {
    resource: string;
    id: string;
    mode: ApiMode;
    name: string;
    email: string;
    locale: Locale;
    recentlyUsedMethods: Array<Method>;
    metadata: any;
    createdAt: string;
    _links: ILinks;

    // Access token parameters
    testmode?: boolean;
  }

  namespace Customer {
    namespace Params {
      interface ICreate {
        /** @param name - The full name of the customer.  */
        name?: string;
        /** @param email - The email address of the customer. */
        email?: string;
        /** @param locale - Allows you to preset the language
         *                  to be used in the hosted payment
         *                  pages shown to the consumer.
         *                  When this parameter is not provided,
         *                  the browser language will be used
         *                  instead in the payment flow
         *                  (which is usually more accurate).
         */
        locale?: Locale;
        /** @param metadata - Provide any data you like,
         *                    and we will save the data alongside
         *                    the customer.
         *                    Whenever you fetch the customer with
         *                    our API, we’ll also include the metadata.
         *                    You can use up to 1kB of JSON.
         */
        metadata?: any;

        // Access token parameters
        /** @param testmode - Set this to true to create a test mode customer. */
        testmode?: boolean;
      }

      interface IGet {
        // Access token parameters
        testmode?: boolean;
      }

      interface IUpdate {
        name?: string;
        email?: string;
        locale?: Locale;
        metadata?: any;

        // Access token parameters
        testmode?: boolean;
      }

      interface IDelete {
        // Access token parameters
        testmode?: boolean;
      }

      interface IList {
        from?: string;
        limit?: number;
      }
    }

    namespace Callback {
      type Create = (error: any, customer: ICustomer) => void;
      type Get = (error: any, customer: ICustomer) => void;
      type Update = (error: any, customer: ICustomer) => void;
      type Delete = (error: any, success: boolean) => void;
      type List = (error: any, customers: Mollie.List<ICustomer>) => void;
    }
  }

  namespace CustomerPayments {
    namespace Params {
      interface ICreate {
        customerId: string;

        name?: string;
        email?: string;
        locale: Locale;
        metadata?: any;

        // Access token parameters
        testmode?: boolean;
      }

      interface IList {
        customerId: string;

        from?: string;
        limit?: number;

        // Access token parameters
        testmode?: boolean;
      }
    }

    namespace Callback {
      type Create = (error: any, customer: ICustomer) => void;
      type List = (error: any, customers: Mollie.List<ICustomer>) => void;
    }
  }
}

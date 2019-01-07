declare namespace Mollie {
  interface IMethod {
    resource: string;
    id: string;
    description: string;
    image: IImage;
    _links: ILinks;
  }

  namespace Method {
    enum ImageSize {
      size1x = 'size1x',
      size2x = 'size2x',
      svg = 'svg',
    }

    enum Include {
      issuers = 'issuers',
      pricing = 'pricing',
    }

    namespace Params {
      interface IGet {
        locale?: Locale;

        // Access token parameters
        profileId?: string;
        testmode?: boolean;
        include?: Array<Include>;
      }

      interface IList {
        sequenceType?: SequenceType;
        locale?: Locale;
        amount?: IAmount;
        resource?: string;
        billingCountry?: string;

        // Access token parameters
        profileId?: string;
        testmode?: boolean;
        include?: Array<Include>;
      }
    }

    namespace Callback {
      type Get = (error: any, method: IMethod) => void;
      type List = (error: any, methods: Mollie.List<IMethod>) => void;
    }
  }
}

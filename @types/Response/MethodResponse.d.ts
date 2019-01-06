declare namespace Mollie {
  interface MethodResponse {
    resource: string;
    id: string;
    description: string;
    image: Image;
    _links: Links;
  }
}

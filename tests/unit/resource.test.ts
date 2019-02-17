import Resource from '@root/resource';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);

describe('resource', () => {
  afterEach(() => {
    // Restore Resource to its defaults
    Resource.resource = undefined;
  });

  it('should set the parent ID with .withParent()', done => {
    mock.onGet('/resources/a/tests/b').reply(200, { success: true });

    Resource.resource = 'resources_tests';
    const resource = new Resource(axios.create());
    resource.withParent({
      resource: 'something',
      id: 'parent',
    });

    // Same signature, only this time we are returning the parent ID directly
    resource.get = async function(id, prms, callback): Promise<any> {
      return this.parentId;
    };
    resource.get('b').then(parentId => {
      expect(parentId).toEqual('parent');
      done();
    });
  });

  it.skip('should create a resource', () => {});

  it.skip('should update a resource', () => {});

  it.skip('should retrieve a resource', () => {});

  it.skip('should retrieve a resource with an include', () => {});

  it.skip('should retrieve a resource with an embed', () => {});

  it.skip('should list resources', () => {});

  it.skip('should accept a single include when listing resources', () => {});

  it.skip('should accept includes when listing resources', () => {});

  it.skip('should accept a single embed when listing resources', () => {});

  it.skip('should accept embeds when listing resources', () => {});

  it.skip('should paginate resources with a page number and limit', () => {});

  it('should delete a resource', done => {
    mock.onDelete('/resource/1').reply(204);
    Resource.resource = 'resource';

    const resource = new Resource(axios.create());
    resource.delete('1').then(result => {
      expect(result).toBeTruthy();
      done();
    });
  });
});

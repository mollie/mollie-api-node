import Resource from '../../src/resource';
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
    resource.get = async function(): Promise<any> {
      return this.parentId;
    };
    resource.get('b').then(parentId => {
      expect(parentId).toEqual('parent');
      done();
    });
  });

  it('should delete a resource', done => {
    mock.onDelete('/resource/1').reply(204);
    Resource.resource = 'resource';

    const resource = new Resource(axios.create());
    resource.delete('1').then(result => {
      expect(result).toEqual(true);
      done();
    });
  });
});

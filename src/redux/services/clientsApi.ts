import { combinedApi } from './combinedApi';

export const clientsApi = combinedApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientsList: builder.query<TResponse, void>({
      query() {
        return {
          url: 'clients/',
        };
      },
      providesTags: ['clientsList'],
    }),
    createClient: builder.mutation<TResponse, ICreateClient>({
      query(data) {
        return {
          url: 'clients/',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['clientsList'],
    }),
    retrieveClient: builder.query<IClientRetrieve, number>({
      query(id) {
        return {
          url: `clients/${id}/`,
        };
      },
    }),
    updateClient: builder.mutation<TResponse, { id: number; data: IEditClient }>({
      query(arg) {
        const { id, data } = arg;
        return {
          url: `clients/${id}/`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    partialUpdateClient: builder.mutation<TResponse, { id: number; data: IEditClient }>({
      query(arg) {
        const { id, data } = arg;
        return {
          url: `clients/${id}/`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    destroyClient: builder.mutation<TResponse, number>({
      query(id) {
        return {
          url: `clients/${id}/`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetClientsListQuery,
  useCreateClientMutation,
  useRetrieveClientQuery,
  useUpdateClientMutation,
  usePartialUpdateClientMutation,
  useDestroyClientMutation,
} = clientsApi;

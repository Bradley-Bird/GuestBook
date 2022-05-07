export const userData = {
  access_token: '123456',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: '1234',
  user: {
    id: '123123',
    aud: 'authenticated',
    role: 'authenticated',
    email: '14@14.com',
    email_confirmed_at: '2022-05-05T19:57:09.00507Z',
    phone: '',
    confirmed_at: '2022-05-05T19:57:09.00507Z',
    recovery_sent_at: '2022-05-06T19:03:30.344403Z',
    last_sign_in_at: '2022-05-06T22:05:06.087684909Z',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {},
    identities: [
      {
        id: '123123',
        user_id: '123123',
        identity_data: {
          sub: '123123',
        },
        provider: 'email',
        last_sign_in_at: '2022-05-05T19:57:09.002193Z',
        created_at: '2022-05-05T19:57:09.002228Z',
        updated_at: '2022-05-05T19:57:09.002231Z',
      },
    ],
    created_at: '2022-05-05T19:57:08.999917Z',
    updated_at: '2022-05-06T22:05:06.088828Z',
  },
};

export const entries = [
  {
    id: 106,
    guest_id: '123123',
    content: 'hello',
    created_at: '2022-05-06T16:44:08.718123+00:00',
  },
  {
    id: 105,
    guest_id: '123123',
    content: 'newnew',
    created_at: '2022-05-06T16:43:51.243806+00:00',
  },
  {
    id: 99,
    guest_id: '123123',
    content: 'Goku',
    created_at: '2022-05-06T16:19:08.340996+00:00',
  },
  {
    id: 79,
    guest_id: '123123',
    content: 'Bradley Bird',
    created_at: '2022-05-06T05:13:30.408837+00:00',
  },
];

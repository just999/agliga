import * as z from 'zod';

// * LOGIN SCHEMA
export const loginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(2, {
    message: 'Password is required',
  }),

  code: z.optional(z.string()),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// * REGISTER SCHEMA
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'Password minimum 6 digits',
  }),
});

const gameSchema = z.object({
  value: z.string(),
  icon: z.any(),
});

export const selectOptionSchema = z.object({
  value: z.string(),
  icon: z.any(),
});

export const profileSchema = z.object({
  name: z.string().min(3, {
    message: 'Nama Rekening Bank wajib di isi',
  }),
  bank: z.object({
    value: z.string(),
    icon: z.any(),
  }),
  game: z.array(gameSchema),
  phone: z.string().min(3, {
    message: 'Phone is required',
  }),
  accountNumber: z.string().min(3, {
    message: 'AccountNumber is required',
  }),
  images: z.optional(z.string().min(1)),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
export type RegisterSchema = z.infer<
  typeof registerSchema & typeof profileSchema
>;

export const combinedRegisterSchema = registerSchema.and(profileSchema);

// * MESSAGE SCHEMA
export const messageSchema = z.object({
  text: z.string().min(1, {
    message: 'Content is required',
  }),
});

export type MessageSchema = z.infer<typeof messageSchema>;

// * FORGOT PASSWORD SCHEMA
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'Password must be 6 characters',
    }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirm password'],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

// * FORM SCHEMA
export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  body: z.string().min(1, {
    message: 'Body is required',
  }),
  author: z.string().min(1, {
    message: 'Author is required',
  }),
  date: z.string().min(1, {
    message: 'Date is required',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];

export const imageUrlValidator = z
  .union([z.instanceof(File), z.string()])
  .optional();
// .refine((files) => files?.length === 1, 'Image is required.')
// .refine(
//   (files) => files[0]?.size <= MAX_FILE_SIZE,
//   `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
// )
// .refine(
//   (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
//   '.jpg, .jpeg, .svg, .png and .webp files are accepted.'
// );

// * POST SCHEMA
export const postSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  img: imageUrlValidator,
  category: z.object({
    value: z.string(),
    icon: z.optional(z.any()),
  }),
  author: z.string().min(1, {
    message: 'Author is required',
  }),
  brief: z.string().min(1, {
    message: 'Brief is required',
  }),
});

export type PostSchema = z.infer<typeof postSchema>;

const defaultBank = {
  value: '',
  icon: null,
};

const defaultGame = {
  value: '',
  icon: null,
};

export const depoSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  bank: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultBank),
  accountNumber: z.string().min(3, {
    message: 'AccountNumber is required',
  }),
  depoAmount: z.string().min(1, {
    message: 'DepoAmount is required',
  }),
  game: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultGame),
  gameUserId: z.string().min(1, {
    message: 'GameUserId is required',
  }),
  bankPT: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultBank),
});

export type DepoSchema = z.infer<typeof depoSchema>;

export const wdSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  bank: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultBank),
  accountNumber: z.string().min(3, {
    message: 'AccountNumber is required',
  }),
  wdAmount: z.string().min(1, {
    message: 'WdAmount is required',
  }),
  game: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultGame),
  gameUserId: z.string().min(1, {
    message: 'GameUserId is required',
  }),
  // bankPT: z
  //   .object({
  //     value: z.string(),
  //     icon: z.any(),
  //   })
  //   .default(defaultBank),
});

export type WdSchema = z.infer<typeof wdSchema>;

export const depoWdFormSchema = z.object({
  depoAmount: z.string().optional(),
  wdAmount: z.string().optional(),
  // ... other fields if needed
});

export type DepoWdFormSchema = z.infer<typeof depoWdFormSchema>;

export type CombineFormSchema = z.infer<typeof depoSchema | typeof wdSchema>;

export const newFormSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  bank: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultBank),
  accountNumber: z.string().min(3, {
    message: 'AccountNumber is required',
  }),
  depoAmount: z.string().optional(),
  wdAmount: z.string().optional(),
  game: z
    .union([
      z.string(),
      z.object({
        value: z.string().optional(),
        icon: z.union([z.string(), z.function()]).optional(), // Allow both string and function
      }),
    ])
    .optional(),
  gameUserId: z.string().optional(),
  bankPT: z
    .union([
      z.string(),
      z.object({
        value: z.string().optional(),
        icon: z.union([z.string(), z.function()]).optional(), // Allow both string and function
      }),
    ])
    .optional(),
});
export type NewFormSchema = z.infer<typeof newFormSchema>;

// !COMBINE DEPO WD SCHEMA

const baseSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  bank: z.object({ value: z.string(), icon: z.any() }).default(defaultBank),
  accountNumber: z.string().min(3, { message: 'AccountNumber is required' }),
  game: z.object({ value: z.string(), icon: z.any() }).default(defaultGame),
  gameUserId: z.string().min(1, { message: 'GameUserId is required' }),
});

export const combinedDepoWdSchema = z.discriminatedUnion('type', [
  baseSchema.extend({
    type: z.literal('deposit'),
    depoAmount: z.string().min(1, { message: 'DepoAmount is required' }),
    bankPT: z.object({ value: z.string(), icon: z.any() }).default(defaultBank),
  }),
  baseSchema.extend({
    type: z.literal('withdrawal'),
    wdAmount: z.string().min(1, { message: 'WdAmount is required' }),
  }),
]);

export type CombinedDepoWdSchema = z.infer<typeof combinedDepoWdSchema>;

export const memberDepositStatusSchema = z.object({
  status: z.string().min(1, {
    message: 'status is required',
  }),
});

export type MemberDepositStatusSchema = z.infer<
  typeof memberDepositStatusSchema
>;

export const editUserProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  bank: z
    .object({
      value: z.string(),
      icon: z.any(),
    })
    .default(defaultBank),
  accountNumber: z.string().min(3, {
    message: 'AccountNumber is required',
  }),
  game: z.array(gameSchema),
  phone: z.string().min(3, {
    message: 'Phone is required',
  }),
});

export type EditUserProfileSchema = z.infer<typeof editUserProfileSchema>;

export const updateAvatarSchema = z.object({
  // image: z.instanceof(File),
  image: imageUrlValidator,
});

export type UpdateAvatarSchema = z.infer<typeof updateAvatarSchema>;

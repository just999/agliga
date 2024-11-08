import { z } from 'zod';

// !TOGEL 4D 3D 2D  SCHEMA
export const num4dSchema = z.object({
  d1: z.optional(
    z.string().max(1, {
      message: 'can not more than 1 digit',
    })
  ),
  d2: z.optional(
    z.string().max(1, {
      message: 'can not more than 1 digit',
    })
  ),
  d3: z.optional(
    z.string().max(1, {
      message: 'can not more than 1 digit',
    })
  ),
  d4: z.optional(
    z.string().max(1, {
      message: 'can not more than 1 digit',
    })
  ),
});
// .superRefine((value, context) => {
// });

export const number4dBetSchema = z.object({
  game: z.optional(z.string()),
  wager: z.optional(z.string()),
  dis: z.optional(z.string()),
  net: z.optional(z.string()),
  period: z.optional(z.string()),
  status: z.optional(z.string()),
});

const totalBetSchema = z.object({
  copy: z.boolean(),
  copyWager: z.optional(z.string()),
  totalBet: z.optional(z.string()),
});

export const numSchema = num4dSchema.merge(number4dBetSchema);

const number4dArraySchema = z.array(numSchema);

export const sin4dSchema = z
  .object({
    sin4ds: number4dArraySchema,
  })
  .merge(totalBetSchema);

// export type Number4dSchema = z.infer<typeof num4dSchema>;

export type Sin4dSchema = z.infer<typeof sin4dSchema>['sin4ds'][number];

export type Sin4dFormDataSchema = z.infer<typeof sin4dSchema>;

// !TOGEL 4D 3D 2D SET SCHEMA
const number4dSetBetSchema = z.object({
  bet4d: z.string().optional(),
  bet3d: z.string().optional(),
  bet2d: z.string().optional(),
  allBet: z.string().optional(),
});

export const number4dSetSchema = num4dSchema.merge(number4dSetBetSchema);

const number4dSetArraySchema = z.array(number4dSetSchema);

export const sin4dSetSchema = z
  .object({
    sin4dSet: number4dSetArraySchema,
  })
  .merge(totalBetSchema);

export type Sin4dSetSchema = z.infer<typeof sin4dSetSchema>['sin4dSet'][number];

export type Sin4dSetFormDataSchema = z.infer<typeof sin4dSetSchema>;
export type Number4dSetSchema = z.infer<typeof number4dSetSchema>;

// ?TOGEL BOLAK BALIK /BBFS  SCHEMA
const bbD5Schema = z.object({
  bbNumber: z.string().max(5, {
    message: 'can not more than 5 digit',
  }),
});

// const bbCombineSchema = number4dSchema.merge(bbD5Schema);

const bbSchema = bbD5Schema.merge(number4dSetBetSchema);

const bbArraySchema = z.array(bbSchema);

export const bbSin4dSchema = z
  .object({
    bb: bbArraySchema,
  })
  .merge(totalBetSchema);

export type BbSin4dSchema = z.infer<typeof bbSin4dSchema>['bb'][number];
export type BbSinSchema = z.infer<typeof bbSin4dSchema>;
export type BbSchema = z.infer<typeof bbSchema>;

export const bbTabSchema = num4dSchema.merge(number4dBetSchema);
export const bbTabArraySchema = z.array(bbTabSchema);

export const bbTab4dSchema = z
  .object({
    bbfs: bbTabArraySchema,
  })
  .merge(totalBetSchema);

export type BbTab4dSchema = z.infer<typeof bbTab4dSchema>['bbfs'][number];
export type BbTabSchema = z.infer<typeof bbTab4dSchema>;

// ?TOGEL BIG SMALL ODD EVEN  SCHEMA

// const newSmall = generateAndPadArray(50, 0);
// const newBig = generateAndPadArray(50, 50);
// const newOdd = generateAndPadArray(50, 1, 2);
// const newEven = generateAndPadArray(50, 0, 2);

const bigSmallOddEvenEnum = z.enum(['big', 'small', 'odd', 'even']);

const gameEnum = z.enum(['2dd', '2dt', '2d']);

export const bseoOnlySchema = z.object({
  bseo: bigSmallOddEvenEnum,
  position: gameEnum,
  wager: z.string().max(5, {
    message: 'bet is required',
  }),
});

const bseo4dSchema = bseoOnlySchema.merge(number4dBetSchema);

const bseo4dArraySchema = z.array(bseo4dSchema);

export const bseoTableSchema = z
  .object({
    bsEo: bseo4dArraySchema,
  })
  .merge(totalBetSchema);

export type BseoTableSchema = z.infer<typeof bseoTableSchema>['bsEo'][number];

export const bigSmallOddEvenSchema = z.object({
  bseo: bigSmallOddEvenEnum,
  bseoArray: number4dArraySchema,
  position: gameEnum,
  wager: z.string().max(5, {
    message: 'bet is required',
  }),
});

export const bigSmallOddEvenArraySchema = z.array(bigSmallOddEvenSchema);

export type BseoArraySchema = z.infer<
  typeof bigSmallOddEvenSchema
>['bseoArray'][number];

export type BigSmallOddEvenSchema = z.infer<typeof bigSmallOddEvenSchema>;

export const bseoSchema = z
  .object({
    bs: bigSmallOddEvenArraySchema,
  })
  .merge(totalBetSchema);

export type Bseo4dSchema = z.infer<typeof bseoSchema>['bs'][number];
export type BseoSchema = z.infer<typeof bseoSchema>;

// !COLOK-BEBAS SCHEMA
export const singleDigitSchema = z.object({
  d1: z.optional(
    z.string().max(1, {
      message: 'can not more than 1 digit',
    })
  ),
});

const colokBebasSchema = singleDigitSchema.merge(number4dBetSchema);

const colokBebasArraySchema = z.array(colokBebasSchema);

export const colokBebasTableSchema = z.object({ cb: colokBebasArraySchema });

export type ColokBebasTableSchema = z.infer<
  typeof colokBebasTableSchema
>['cb'][number];

export type ClTableSchema = z.infer<typeof colokBebasTableSchema>;

// ?COLOK MACAU SCHEMA

export const number = z.object({
  d1: z.string().max(1, {
    message: 'can not be empty',
  }),
  d2: z.string().max(1, {
    message: 'can not be empty',
  }),
});

const colokMacauSchema = number.merge(number4dBetSchema);

const colokMacauArraySchema = z.array(colokMacauSchema);

export const colokMacauTableSchema = z
  .object({ cm: colokMacauArraySchema })
  .merge(totalBetSchema);

export type ColokMacauTableSchema = z.infer<
  typeof colokMacauTableSchema
>['cm'][number];

export type CmSchema = z.infer<typeof colokMacauTableSchema>;

// ?COLOK NAGA SCHEMA

export const numberNaga = z.object({
  d1: z.string().max(1, {
    message: 'can not be empty',
  }),
  d2: z.string().max(1, {
    message: 'can not be empty',
  }),
  d3: z.string().max(1, {
    message: 'can not be empty',
  }),
});

const colokNagaSchema = numberNaga.merge(number4dBetSchema);

const colokNagaArraySchema = z.array(colokNagaSchema);

export const colokNagaTableSchema = z
  .object({ cn: colokNagaArraySchema })
  .merge(totalBetSchema);

export type ColokNagaTableSchema = z.infer<
  typeof colokNagaTableSchema
>['cn'][number];

export type CnSchema = z.infer<typeof colokNagaTableSchema>;

// ?COLOK JITU SCHEMA

const positionEnum = z.enum(['', 'as', 'kop', 'kepala', 'ekor']);

export const numberJitu = z.object({
  d1: z.string().max(1, {
    message: 'can not be empty',
  }),
  position: positionEnum,
});

const colokJituSchema = numberJitu.merge(number4dBetSchema);

const colokJituArraySchema = z.array(colokJituSchema);

export const colokJituTableSchema = z
  .object({ cj: colokJituArraySchema })
  .merge(totalBetSchema);

export type ColokJituTableSchema = z.infer<
  typeof colokJituTableSchema
>['cj'][number];

export type CjSchema = z.infer<typeof colokJituTableSchema>;

// ?50 - 50 SCHEMA

const bigSmallEnum = z.enum(['big', 'small']).optional();
const oddEvenEnum = z.enum(['odd', 'even']).optional();
const suitEnum = z.enum(['as', 'kop', 'kepala', 'ekor']);
const sideMiddleEnum = z.enum(['middle', 'side']).optional();
const monoStereoEnum = z.enum(['mono', 'stereo']).optional();
const kembangKempisKembarEnum = z
  .enum(['kembang', 'kempis', 'kembar'])
  .optional();

const shioEnum = z.enum([
  'dragon',
  'rabbit',
  'tiger',
  'ox',
  'rat',
  'swine',
  'dog',
  'rooster',
  'monkey',
  'lamb',
  'horse',
  'snake',
]);

export const fiftyFiftyOptionSchema = z.object({
  bigSmall: bigSmallEnum,
  oddEven: oddEvenEnum,
  sideMiddle: sideMiddleEnum,
});

const fiftyFiftySchema = fiftyFiftyOptionSchema.merge(number4dBetSchema);

const fiftyFiftyArraySchema = z.array(fiftyFiftySchema);

export const fiftyFiftyTableSchema = z
  .object({ ff: fiftyFiftyArraySchema })
  .merge(totalBetSchema);

export type FiftyFiftyOptionSchema = z.infer<typeof fiftyFiftyOptionSchema>;
export type FiftyFiftyTableSchema = z.infer<
  typeof fiftyFiftyTableSchema
>['ff'][number];

export type FfSchema = z.infer<typeof fiftyFiftyTableSchema>;
// ?50 - 50 special SCHEMA

export const fiftyFiftyOeBsSpecialSchema = z.object({
  suit: suitEnum,
  oddEven: oddEvenEnum,
  bigSmall: bigSmallEnum,
});

const fiftyFiftySpecialSchema =
  fiftyFiftyOeBsSpecialSchema.merge(number4dBetSchema);

const fiftyFiftySpecialArraySchema = z.array(fiftyFiftySpecialSchema);

export const fiftyFiftyOeBsTableSchema = z
  .object({ ffSp: fiftyFiftySpecialArraySchema })
  .merge(totalBetSchema);

export type FiftyFiftyOeBsOptionSchema = z.infer<
  typeof fiftyFiftySpecialSchema
>;

export type FiftyFiftyOeBsTableSchema = z.infer<
  typeof fiftyFiftyOeBsTableSchema
>['ffSp'][number];

export type FfOeBsSchema = z.infer<typeof fiftyFiftyOeBsTableSchema>;

// ?50 - 50 COMBO SCHEMA

export const fiftyFiftyMsKkkSchema = z.object({
  monoStereo: monoStereoEnum,
  kembangKempisKembar: kembangKempisKembarEnum,
});

const fiftyFiftyComboSchema = fiftyFiftyMsKkkSchema.merge(number4dBetSchema);

const fiftyFiftyComboArraySchema = z.array(fiftyFiftyComboSchema);

export const fiftyFiftyMsKkkTableSchema = z
  .object({ ffC: fiftyFiftyComboArraySchema })
  .merge(totalBetSchema);

export type FiftyFiftyMsKkkOptionSchema = z.infer<typeof fiftyFiftyComboSchema>;

export type FiftyFiftyMsKkkTableSchema = z.infer<
  typeof fiftyFiftyMsKkkTableSchema
>['ffC'][number];

export type FfMsKkkSchema = z.infer<typeof fiftyFiftyMsKkkTableSchema>;
// ?MACAU COMBO SCHEMA

export const macauBsOeSchema = z.object({
  bigSmall: bigSmallEnum,
  oddEven: oddEvenEnum,
});

const macauComboSchema = macauBsOeSchema.merge(number4dBetSchema);

const macauComboArraySchema = z.array(macauComboSchema);

export const macauBsOeTableSchema = z
  .object({ macauC: macauComboArraySchema })
  .merge(totalBetSchema);

export type MacauBsOeOptionSchema = z.infer<typeof macauBsOeTableSchema>;

export type MacauBsOeTableSchema = z.infer<
  typeof macauBsOeTableSchema
>['macauC'][number];

export type MacauCSchema = z.infer<typeof macauBsOeTableSchema>;

// ?DASAR SCHEMA

export const dasarBsOeSchema = z.object({
  bigSmall: bigSmallEnum,
  oddEven: oddEvenEnum,
});

const dasarComboSchema = dasarBsOeSchema.merge(number4dBetSchema);

const dasarComboArraySchema = z.array(dasarComboSchema);

export const dasarBsOeTableSchema = z
  .object({ dasar: dasarComboArraySchema })
  .merge(totalBetSchema);

export type DasarBsOeOptionSchema = z.infer<typeof dasarBsOeTableSchema>;

export type DasarBsOeTableSchema = z.infer<
  typeof dasarBsOeTableSchema
>['dasar'][number];

export type DasarCSchema = z.infer<typeof dasarBsOeTableSchema>;

// ?Shio SCHEMA

export const shioDetailsSchema = z.object({
  shio: shioEnum,
});

const shioComboSchema = shioDetailsSchema.merge(number4dBetSchema);

const shioComboArraySchema = z.array(shioComboSchema);

export const shioTableSchema = z
  .object({ shio: shioComboArraySchema })
  .merge(totalBetSchema);

export type ShioOptionSchema = z.infer<typeof shioTableSchema>;

export type ShioTableSchema = z.infer<typeof shioTableSchema>['shio'][number];

export type ShioSchema = z.infer<typeof shioTableSchema>;

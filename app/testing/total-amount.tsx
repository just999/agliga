// 'use client';

// import { Control } from 'react-hook-form';
// import { TestingPageProps } from './page';

// type TotalAmountProps = {
//   control: Control<TestingPageProps>;
//   getTotal: any;
//   useWatch: any;
// };

// // const getTotal = (payload: TestingPageProps['cart']) => {
// //   let total = 0;

// //   for (const item of payload) {
// //     total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
// //   }
// //   return total;
// // };

// const TotalAmount = ({ control, getTotal, useWatch }: TotalAmountProps) => {
//   const cartValues = useWatch({
//     control,
//     name: 'cart',
//   });
//   if (!cartValues || cartValues[0] === '') return null;
//   const net = Number.isNaN(getTotal(cartValues)) ? 0 : +getTotal(cartValues);
//   return net;
// };

// export default TotalAmount;

// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import { createPortal } from 'react-dom';

// import UserLayout from '@/app/dashboard/admin/users/[userId]/layout';
// import { useState, useEffect } from 'react';

// // type PortalProviderProps = {
// //   children: React.ReactNode;
// // };

// // const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
// //   const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
// //     null
// //   );

// //   useEffect(() => {
// //     const element = document.getElementById('portal-root');
// //     setPortalContainer(element);
// //   }, []);

// //   if (!portalContainer) {
// //     return null; // Render nothing until portalContainer is ready
// //   }

// //   return createPortal(children, portalContainer);
// // };

// // export default PortalProvider;
// // contexts/PortalContext.tsx

// // 'use client';

// // import React, { createContext, useState, useContext } from 'react';
// // import Portal from '../portal';

// // interface PortalContextType {
// //   addToPortal: (content: React.ReactNode) => void;
// //   removeFromPortal: () => void;
// // }

// // const PortalContext = createContext<PortalContextType | undefined>(undefined);

// // export function PortalProvider({ children }: { children: React.ReactNode }) {
// //   const [portalContent, setPortalContent] = useState<React.ReactNode | null>(
// //     null
// //   );

// //   const addToPortal = (content: React.ReactNode) => {
// //     setPortalContent(content);
// //   };

// //   const removeFromPortal = () => {
// //     setPortalContent(null);
// //   };

// //   return (
// //     <PortalContext.Provider value={{ addToPortal, removeFromPortal }}>
// //       {children}
// //       {portalContent && <Portal>{portalContent}</Portal>}
// //     </PortalContext.Provider>
// //   );
// // }

// // export function usePortal() {
// //   const context = useContext(PortalContext);
// //   if (context === undefined) {
// //     throw new Error('usePortal must be used within a PortalProvider');
// //   }
// //   return context;
// // }

// // ---  Your App (App Router) ---
// export default function Page() {
//   const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

//   useEffect(() => {
//     const rootElement = document.createElement('div');
//     rootElement.id = 'portal-root';
//     document.body.appendChild(rootElement);
//     setPortalRoot(rootElement);

//     return () => {
//       document.body.removeChild(rootElement);
//     };
//   }, []); // Run once after the component mounts

//   return (
//     <div className='container'>
//       <UserLayout
//         root={{ root: portalRoot }}
//         params={{ userId: '67013c972b40cdc3bc030671' }}>
//         <div>test</div>
//       </UserLayout>
//     </div>
//   );
// }

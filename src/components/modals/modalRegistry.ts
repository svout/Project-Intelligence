import React from 'react';

// Placeholder modal components (the app currently doesn't wire any modal flows).
function PlaceholderModal() {
  return null;
}

export type ModalKey = 'thank_you' | 'export_data';

export const modalRegistry: Record<ModalKey, React.ComponentType<any>> = {
  thank_you: PlaceholderModal,
  export_data: PlaceholderModal,
};


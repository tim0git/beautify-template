export const config = {
  screenTitle: 'Inbox',
  backButton: false,
  screenInstructionsProps: {
    instructionProps: {
      content: 'No messages yet.',
      type: 'Instruction',
      testID: 'TEST_GUEST_WELCOME_INSTRUCTION',
    },
    bodyProps: {
      content:
        'You can send messages to your service provider once you have booked a treatment and have an active account.',
      type: 'Body',
      testID: 'TEST_GUEST_WELCOME_BODY',
    },
  },
};

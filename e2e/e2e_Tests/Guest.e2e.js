/* eslint-disable no-undef */

describe('<Guest />', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  describe('Guest - Onboarding', () => {
    it('Should show onboarding screen', async () => {
      await expect(element(by.id('Onboarding_Default_Screen_Template'))).toBeVisible();
    });

    it('Should show Home screen after skipping onboarding', async () => {
      await element(by.id('Header_Next_Button')).tap();
      await expect(element(by.id('Home_SearchBarButton'))).toBeVisible();
    });
  });

  describe('Guest - Navigation', () => {
    // Guest flow after onboarding
    it('Home Screen should show a search bar button', async () => {
      await expect(element(by.id('Home_SearchBarButton'))).toBeVisible();
    });

    it('should show search screen after tap on search bar button', async () => {
      await element(by.id('Home_SearchBarButton')).tap();
      await expect(element(by.text('Start searching'))).toBeVisible();
      await expect(element(by.text('Browse by category or by practitioner'))).toBeVisible();
    });

    it('should show bookings screen after tap on bookings bottom tab bar icon', async () => {
      await element(by.id('TabBar_Bookings')).tap();
      await expect(element(by.text('No Bookings made yet.'))).toBeVisible();
    });

    it('should show inbox screen after tap on inbox bottom tab bar icon', async () => {
      await element(by.id('TabBar_Inbox')).tap();
      await expect(element(by.text('No messages yet.'))).toBeVisible();
    });

    it('should show guest profile screen after tap on profile bottom tab bar icon', async () => {
      await element(by.id('TabBar_Profile')).tap();
      await expect(
        element(
          by.text(
            "Hey! It looks like you're new here. Once you've booked a treatment, all your info will be found here.",
          ),
        ),
      ).toBeVisible();
    });
  });
});

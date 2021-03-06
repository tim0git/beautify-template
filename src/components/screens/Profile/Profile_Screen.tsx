import React from 'react';
import {View} from 'react-native';
import {ThemeProvider} from '../../../services/ThemeProvider';
import Guest_Welcome from '../../organisms/Guest_Welcome/Guest_Welcome';
import Menu_Mapper from '../../organisms/Menu_Mapper/Menu_Mapper';
import Default_Screen_Template from '../../templates/Default_Screen/Default_Screen_Template';
export interface Props {
  navigation: {
    navigate: () => void;
  };
  isLoggedIn: boolean;
  signOut: () => void;
}

const Profile_Screen: React.FC<Props> = ({navigation, isLoggedIn, signOut}) => {
  const {styles, config} = ThemeProvider('Profile');
  const {GUEST_PROFILE_MENU, USER_PROFILE_MENU} = ThemeProvider('global').config;
  const {screenTitle, backButton, screenInstructionsProps} = config;

  const UserProfile = () => {
    return (
      <View style={styles.container}>
        <Menu_Mapper
          scrollEnabled={true}
          navigation={navigation}
          menuData={USER_PROFILE_MENU}
          testID="User_Profile_Menu_Mapper"
          signOut={signOut}
        />
      </View>
    );
  };

  const GuestProfile = () => {
    return (
      <View style={styles.container}>
        <View style={styles.guestWelcomeContainer}>
          <Guest_Welcome
            screenInstructionsProps={screenInstructionsProps}
            navigation={navigation}
            testID="Profile_Screen_Guest_Welcome"
          />
        </View>
        <View style={styles.menuListContainer}>
          <Menu_Mapper
            scrollEnabled={false}
            navigation={navigation}
            menuData={GUEST_PROFILE_MENU}
            testID="User_Profile_Guest_Menu_Mapper"
          />
        </View>
      </View>
    );
  };

  return (
    <Default_Screen_Template
      screenTitle={screenTitle}
      testID="Profile_Default_Screen_Template"
      render={isLoggedIn ? UserProfile() : GuestProfile()}
      backButton={backButton}
    />
  );
};

export default Profile_Screen;

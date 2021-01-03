/**
 * @name WebView_Screen
 * @description {description}
 *
 */
import React, {useState} from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import {ThemeProvider} from '../../../services/ThemeProvider';
import {WebView} from 'react-native-webview';
import Header from '../../atoms/Header/Header';

export interface Props {
  route: {
    params: {
      title: string;
    };
  };
}

const WebView_Screen: React.FC<Props> = ({route}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {config, style} = ThemeProvider('WebView');
  const {WEB_VIEW_URLS} = ThemeProvider('global').config;
  const {WebViewProps} = config;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={style.pageWrapper} testID="WebView_Screen">
        <Header headerText={route.params.title} type="Screen" testID="WebView_Screen_Header" />
        {loading && <Text testID="WebView_Screen_Loading">Loading...</Text>}
        {error && <Text testID="WebView_Screen_Error">Error...</Text>}
        {!error && (
          <View style={style.container}>
            <WebView
              {...WebViewProps}
              testID="WebView_Screen_WebView"
              source={{uri: WEB_VIEW_URLS[route.params.title]}}
              style={style.WebView}
              onLoad={() => setLoading(false)}
              onHttpError={() => {
                setError(true);
                setLoading(false);
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default WebView_Screen;
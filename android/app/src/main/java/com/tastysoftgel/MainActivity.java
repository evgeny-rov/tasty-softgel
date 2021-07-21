package com.tastysoftgel;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
import android.view.View;
import android.graphics.Color;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, true);

    getWindow().getDecorView().setSystemUiVisibility(
      View.SYSTEM_UI_FLAG_LAYOUT_STABLE
      | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

    getWindow().setStatusBarColor(Color.TRANSPARENT);
    
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "TastySoftgel";
  }
}

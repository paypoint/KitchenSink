import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import { AppTabBar } from "./AppTabBar";
import { useTheme } from "../../context/ThemeContext";

type TabItem = {
  key: string;
  title: string;
  component: React.ComponentType;
};

type Props = {
  tabs: TabItem[];
};

export function AppTabView({ tabs }: Props) {
  const { colors } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const routes = tabs.map(({ key, title }) => ({ key, title }));

  const scenes = tabs.reduce((acc, tab) => {
    acc[tab.key] = tab.component;
    return acc;
  }, {} as Record<string, React.ComponentType>);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap(scenes)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      lazy
      // sceneContainerStyle={{ backgroundColor: colors.background }}
      renderTabBar={(props) => <AppTabBar {...props} />}
    />
  );
}

/* 
Usage Syntax:

<AppTabView
  tabs={[
    { key: "tab1", title: "Tab One", component: TabOne },
    { key: "tab2", title: "Tab Two", component: TabTwo },
  ]}
/>
*/

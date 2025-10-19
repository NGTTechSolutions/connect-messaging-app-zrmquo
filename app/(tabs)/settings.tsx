
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Platform,
  Alert,
  Switch
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  type: 'navigation' | 'toggle';
  value?: boolean;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [readReceiptsEnabled, setReadReceiptsEnabled] = React.useState(true);
  const [lastSeenEnabled, setLastSeenEnabled] = React.useState(true);

  const accountSettings: SettingItem[] = [
    {
      id: "profile",
      title: "Profile",
      icon: "person.circle",
      type: "navigation",
      onPress: () => Alert.alert("Profile", "Navigate to profile settings"),
    },
    {
      id: "privacy",
      title: "Privacy",
      icon: "lock.shield",
      type: "navigation",
      onPress: () => Alert.alert("Privacy", "Navigate to privacy settings"),
    },
    {
      id: "security",
      title: "Security",
      icon: "checkmark.shield",
      type: "navigation",
      onPress: () => Alert.alert("Security", "Navigate to security settings"),
    },
  ];

  const chatSettings: SettingItem[] = [
    {
      id: "notifications",
      title: "Notifications",
      icon: "bell.fill",
      type: "toggle",
      value: notificationsEnabled,
    },
    {
      id: "read-receipts",
      title: "Read Receipts",
      icon: "checkmark.circle",
      type: "toggle",
      value: readReceiptsEnabled,
    },
    {
      id: "last-seen",
      title: "Last Seen",
      icon: "clock",
      type: "toggle",
      value: lastSeenEnabled,
    },
  ];

  const otherSettings: SettingItem[] = [
    {
      id: "storage",
      title: "Storage and Data",
      icon: "internaldrive",
      type: "navigation",
      onPress: () => Alert.alert("Storage", "Navigate to storage settings"),
    },
    {
      id: "help",
      title: "Help",
      icon: "questionmark.circle",
      type: "navigation",
      onPress: () => Alert.alert("Help", "Navigate to help center"),
    },
    {
      id: "about",
      title: "About",
      icon: "info.circle",
      type: "navigation",
      onPress: () => Alert.alert("About", "Connect v1.0.0"),
    },
  ];

  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case "notifications":
        setNotificationsEnabled(value);
        break;
      case "read-receipts":
        setReadReceiptsEnabled(value);
        break;
      case "last-seen":
        setLastSeenEnabled(value);
        break;
    }
  };

  const renderSettingItem = (item: SettingItem) => (
    <Pressable
      key={item.id}
      style={({ pressed }) => [
        styles.settingItem,
        pressed && item.type === 'navigation' && styles.settingItemPressed,
      ]}
      onPress={item.type === 'navigation' ? item.onPress : undefined}
      disabled={item.type === 'toggle'}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <IconSymbol name={item.icon as any} size={22} color={colors.primary} />
        </View>
        <Text style={styles.settingTitle}>{item.title}</Text>
      </View>
      
      {item.type === 'navigation' ? (
        <IconSymbol name="chevron.right" size={18} color={colors.textSecondary} />
      ) : (
        <Switch
          value={item.value}
          onValueChange={(value) => handleToggle(item.id, value)}
          trackColor={{ false: colors.highlight, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      )}
    </Pressable>
  );

  const renderSection = (title: string, items: SettingItem[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {items.map((item, index) => (
          <View key={item.id}>
            {renderSettingItem(item)}
            {index < items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Settings",
            headerLargeTitle: true,
          }}
        />
      )}
      <ScrollView 
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {renderSection("Account", accountSettings)}
        {renderSection("Chat Settings", chatSettings)}
        {renderSection("Other", otherSettings)}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Connect Messaging App</Text>
          <Text style={styles.footerVersion}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemPressed: {
    backgroundColor: colors.highlight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 60,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

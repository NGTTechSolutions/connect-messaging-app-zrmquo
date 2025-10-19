
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Pressable,
  Platform,
  Alert
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const userProfile = {
    name: "John Doe",
    phone: "+1 234 567 8900",
    status: "Hey there! I'm using Connect",
    avatar: "👨‍💼",
  };

  const profileActions = [
    {
      id: "edit-profile",
      title: "Edit Profile",
      icon: "pencil",
      color: colors.primary,
      onPress: () => Alert.alert("Edit Profile", "This feature will be available soon"),
    },
    {
      id: "change-status",
      title: "Change Status",
      icon: "text.bubble",
      color: colors.secondary,
      onPress: () => Alert.alert("Change Status", "This feature will be available soon"),
    },
    {
      id: "qr-code",
      title: "My QR Code",
      icon: "qrcode",
      color: colors.accent,
      onPress: () => Alert.alert("QR Code", "This feature will be available soon"),
    },
  ];

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Edit", "Edit profile")}
      style={styles.headerButton}
    >
      <IconSymbol name="pencil" color={colors.primary} size={20} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profile",
            headerLargeTitle: true,
            headerRight: renderHeaderRight,
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
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{userProfile.avatar}</Text>
            <Pressable 
              style={styles.editAvatarButton}
              onPress={() => Alert.alert("Change Avatar", "This feature will be available soon")}
            >
              <IconSymbol name="camera.fill" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
          
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.phone}>{userProfile.phone}</Text>
          
          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.status}>{userProfile.status}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {profileActions.map((action) => (
              <Pressable
                key={action.id}
                style={({ pressed }) => [
                  styles.actionCard,
                  pressed && styles.actionCardPressed,
                ]}
                onPress={action.onPress}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <IconSymbol name={action.icon as any} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <IconSymbol name="envelope.fill" size={20} color={colors.primary} />
                <Text style={styles.infoLabel}>Email</Text>
              </View>
              <Text style={styles.infoValue}>john.doe@example.com</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <IconSymbol name="calendar" size={20} color={colors.primary} />
                <Text style={styles.infoLabel}>Joined</Text>
              </View>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <IconSymbol name="checkmark.shield.fill" size={20} color={colors.secondary} />
                <Text style={styles.infoLabel}>Verified</Text>
              </View>
              <IconSymbol name="checkmark.circle.fill" size={20} color={colors.secondary} />
            </View>
          </View>
        </View>

        <Pressable 
          style={styles.logoutButton}
          onPress={() => Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive" }
          ])}
        >
          <IconSymbol name="arrow.right.square" size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 80,
    width: 120,
    height: 120,
    textAlign: 'center',
    lineHeight: 120,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.card,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  statusContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
    width: '90%',
  },
  statusLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  status: {
    fontSize: 15,
    color: colors.text,
  },
  actionsSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  actionCardPressed: {
    opacity: 0.7,
    backgroundColor: colors.highlight,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
  headerButton: {
    padding: 8,
  },
});

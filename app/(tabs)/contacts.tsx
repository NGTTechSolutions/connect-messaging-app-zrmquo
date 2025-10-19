
import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable,
  TextInput,
  Platform,
  Alert
} from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: string;
  isOnline: boolean;
  avatar: string;
}

export default function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+1 234 567 8901",
      status: "Available",
      isOnline: true,
      avatar: "👩‍💼",
    },
    {
      id: "2",
      name: "Mike Chen",
      phone: "+1 234 567 8902",
      status: "At work",
      isOnline: true,
      avatar: "👨‍💻",
    },
    {
      id: "3",
      name: "Emma Wilson",
      phone: "+1 234 567 8903",
      status: "Busy",
      isOnline: false,
      avatar: "👩‍🎨",
    },
    {
      id: "4",
      name: "David Brown",
      phone: "+1 234 567 8904",
      status: "Hey there! I'm using Connect",
      isOnline: true,
      avatar: "👨‍🔬",
    },
    {
      id: "5",
      name: "Lisa Anderson",
      phone: "+1 234 567 8905",
      status: "On vacation 🏖️",
      isOnline: false,
      avatar: "👩‍⚕️",
    },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const renderContactItem = ({ item }: { item: Contact }) => (
    <Pressable
      style={({ pressed }) => [
        styles.contactItem,
        pressed && styles.contactItemPressed,
      ]}
      onPress={() => console.log("Open contact:", item.name)}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.contactContent}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactStatus} numberOfLines={1}>
          {item.status}
        </Text>
      </View>

      <Pressable
        style={styles.messageButton}
        onPress={() => console.log("Message:", item.name)}
      >
        <IconSymbol name="message.fill" size={20} color={colors.primary} />
      </Pressable>
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <IconSymbol name="magnifyingglass" size={18} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")}>
            <IconSymbol name="xmark.circle.fill" size={18} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Add Contact", "This feature will be available soon")}
      style={styles.headerButton}
    >
      <IconSymbol name="person.badge.plus" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Contacts",
            headerLargeTitle: true,
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={styles.container}>
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={[
            styles.listContainer,
            Platform.OS !== 'ios' && styles.listContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyTitle}>No contacts found</Text>
              <Text style={styles.emptyText}>
                Add contacts to start messaging
              </Text>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingBottom: 16,
  },
  listContainerWithTabBar: {
    paddingBottom: 100,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    padding: 0,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
    elevation: 1,
  },
  contactItemPressed: {
    opacity: 0.7,
    backgroundColor: colors.highlight,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 48,
    width: 56,
    height: 56,
    textAlign: 'center',
    lineHeight: 56,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.card,
  },
  contactContent: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  contactStatus: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  messageButton: {
    padding: 8,
    marginLeft: 8,
  },
  headerButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { types as PickerTypes } from "@react-native-documents/picker";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { spacing } from '../theme';

import { AppCard } from '../components/AppCard';
import { AppText } from '../components/AppText';

import { NotificationCard } from '../components/notification/NotificationCard';

import { BtnApp } from '../components/buttons/BtnApp';
import { BtnSplit } from '../components/buttons/BtnSplit';
import { BtnGroup } from '../components/buttons/BtnGroup';
import { BtnToggle } from '../components/buttons/BtnToggle';
import { BtnIcon } from '../components/buttons/BtnIcon';
import { ImgSlider } from '../components/media/ImgSlider';

import { AppInput } from '../components/inputs/AppInput';
import { PasswordInput } from '../components/inputs/PasswordInput';
import { CheckBox } from '../components/inputs/CheckBox';
import { RadioButton } from '../components/inputs/RadioButton';
import { TextArea } from '../components/inputs/TextArea';
import { OtpInput } from '../components/inputs/OtpInput';
import { DateRangeModal } from '../components/inputs/DateRangeModal';
import DateInput from '../components/inputs/DateInput';
import { AppDropdown } from '../components/inputs/AppDropdown';
import { FileUpload } from '../components/inputs/FileUpload';

import { AppModal } from '../components/modals/AppModal';
import { TableModal } from '../components/modals/TableModal';
import { SearchFilterModal } from '../components/modals/SearchFilterModal';
import { ImageModal } from '../components/modals/ImageModal';
import { EmptyStateModal } from '../components/modals/EmptyStateModal';
import { DeviceInfoModal } from '../components/modals/DeviceInfoModal';
import { DeviceInfoTrigger } from '../components/DeviceInfoTrigger';

import { AppActionSheet } from '../components/actionSheet/AppActionSheet';
import { FilterActionSheet } from '../components/actionSheet/FilterActionSheet';
import { ImageActionSheet } from '../components/actionSheet/ImageActionSheet';

import { Accordion } from '../components/accordion/Accordion';

import { ChipTag } from '../components/chips/ChipTag';

import { VerticalStepper } from '../components/stepper/VerticalStepper';
import { HorizontalStepper } from '../components/stepper/HorizontalStepper';

import { StepProgressBar } from '../components/progress/StepProgressBar';
import { FABMenu } from '../components/fab/FABMenu';


const KitchenSink = () => {

    const [notification, setNotification] = useState<null | "success" | "error" | "warning">(null); // Notification

    const [selectedOption, setSelectedOption] = useState("A");  // Toggle Buttons

    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");
    const [code, setCode] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [gender, setGender] = useState("male");
    const [desc, setDesc] = useState("");
    const [otp, setOtp] = useState("");
    const [date, setDate] = useState<Date | null>(null);  // Date Input

    const [open, setOpen] = useState(false);  // Date Input Modal
    const [range, setRange] = useState({  // Date Input Modal
        from: new Date(),
        to: new Date(),
    });

    const [city, setCity] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [category, setCategory] = useState<string>();

    const [file, setFile] = useState<any | null>(null);

    const [modalOpen, setModalOpen] = useState(false);  // Modal
    const [tableOpen, setTableOpen] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [imgModal, setImgModal] = useState(false);
    const [emptyModal, setEmptyModal] = useState(false);
    const [deviceModal, setDeviceModal] = useState(false);

    const [openSheet, setOpenSheet] = useState(false);  // Action Sheet
    const [openFilterSheet, setOpenFilterSheet] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("recent");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmChecked, setConfirmChecked] = useState(false);

    const [currentStep, setCurrentStep] = useState(1);

    const [fabOpen, setFabOpen] = useState(false); // Floating Action Button (FAB)

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {notification && (
                <NotificationCard
                    type={notification}
                    title={
                        notification === "success"
                            ? "Success"
                            : notification === "error"
                                ? "Error"
                                : "Warning"
                    }
                    message="This is a notification message"
                    onHide={() => setNotification(null)}
                />
            )}

            <KeyboardAwareScrollView
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll
                extraScrollHeight={140}
                extraHeight={120}
                contentContainerStyle={{
                    paddingBottom: spacing.xxl + 50 // extra space for keyboard
                }}
            >

                {/* ================= Text Components ================= */}
                <AppCard>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Text Components
                    </AppText>

                    <AppText variant="display">
                        Display Text
                    </AppText>

                    <View style={{ height: spacing.sm }} />

                    <AppText variant="headline">
                        Headline Text
                    </AppText>

                    <View style={{ height: spacing.sm }} />

                    <AppText variant="title">
                        Title Text
                    </AppText>

                    <View style={{ height: spacing.xs }} />

                    <AppText variant="subtitle">
                        subtitle text
                    </AppText>

                    <View style={{ height: spacing.sm }} />

                    <AppText variant="body">
                        Body Text
                    </AppText>

                    <View style={{ height: spacing.sm }} />

                    <AppText variant="caption">
                        Caption Text
                    </AppText>
                </AppCard>

                {/* ================= Image Slider ================= */}
                <ImgSlider
                    height={200}
                    images={[
                        "https://picsum.photos/800/400",
                        "https://picsum.photos/801/400",
                        "https://picsum.photos/802/400",
                    ]}
                />

                {/* ================= Notifications ================= */}
                <AppCard>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Notifications
                    </AppText>
                    <View style={{ gap: 10 }}>
                        <BtnApp
                            title="Success Notification"
                            variant="tonal"
                            fullWidth
                            onPress={() => setNotification("success")}
                            vibrationDuration={10}
                        />

                        <BtnApp
                            title="Error Notification"
                            variant="tonal"
                            fullWidth
                            onPress={() => setNotification("error")}
                        />

                        <BtnApp
                            title="Warning Notification"
                            variant="tonal"
                            fullWidth
                            onPress={() => setNotification("warning")}
                        />
                    </View>
                </AppCard>

                {/* ================= Button Components ================= */}
                <AppCard gap={spacing.md}>
                    <AppText variant="title">Button Components</AppText>

                    {/* ================= Variants ================= */}
                    <AppText variant="subtitle">Variants</AppText>
                    <BtnApp title="Filled" variant="filled" onPress={() => { }} />
                    <BtnApp title="Outlined" variant="outlined" onPress={() => { }} />
                    <BtnApp title="Tonal" variant="tonal" onPress={() => { }} />
                    <BtnApp title="Text" variant="text" onPress={() => { }} />

                    {/* ================= Sizes ================= */}
                    <AppText variant="subtitle">Sizes</AppText>
                    <BtnApp title="Small" size="sm" onPress={() => { }} />
                    <BtnApp title="Medium" size="md" onPress={() => { }} />
                    <BtnApp title="Large" size="lg" onPress={() => { }} />

                    {/* ================= Variant + Size ================= */}
                    <AppText variant="subtitle">Variant + Size</AppText>
                    <BtnApp title="Filled Small" variant="filled" size="sm" onPress={() => { }} />
                    <BtnApp title="Outlined Large" variant="outlined" size="lg" onPress={() => { }} />
                    <BtnApp title="Tonal Medium" variant="tonal" size="md" onPress={() => { }} />
                    <BtnApp title="Text Large" variant="text" size="lg" onPress={() => { }} />

                    {/* ================= Disabled ================= */}
                    <AppText variant="subtitle">Disabled</AppText>
                    <BtnApp title="Filled Disabled" disabled />
                    <BtnApp title="Outlined Disabled" variant="outlined" disabled />
                    <BtnApp title="Tonal Disabled" variant="tonal" disabled />
                    <BtnApp title="Text Disabled" variant="text" disabled />

                    {/* ================= Loading ================= */}
                    <AppText variant="subtitle">Loading</AppText>
                    <BtnApp title="Loading" loading onPress={() => { }} />
                    <BtnApp title="Loading Outlined" variant="outlined" loading onPress={() => { }} />
                    <BtnApp title="Loading Tonal" variant="tonal" loading onPress={() => { }} />

                    {/* ================= With Icons ================= */}
                    <AppText variant="subtitle">With Icons</AppText>
                    <BtnApp
                        title="Leading Icon"
                        onPress={() => { }}
                        leading={<MaterialIcons name="search" size={20} color="#fff" />}
                    />
                    <BtnApp
                        title="Trailing Icon"
                        onPress={() => { }}
                        trailing={<MaterialIcons name="search" size={20} color="#fff" />}
                    />
                    <BtnApp
                        title="Both Icons"
                        onPress={() => { }}
                        leading={<MaterialIcons name="search" size={20} color="#fff" />}
                        trailing={<MaterialIcons name="search" size={20} color="#fff" />}
                    />
                </AppCard>

                {/* ================= Split Button ================= */}
                <AppCard>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Split Button
                    </AppText>

                    <BtnSplit
                        title="Send"
                        onPress={() => { }}
                        onPressSecondary={() => { }}
                        secondaryIcon={
                            <MaterialIcons name="arrow-drop-down" size={20} color="#fff" />
                        }
                    />

                </AppCard>

                {/* ================= Toggle Buttons ================= */}
                <AppCard>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Toggle Buttons
                    </AppText>

                    <BtnGroup>
                        <BtnToggle
                            label="Option A"
                            selected={selectedOption === "A"}
                            onPress={() => setSelectedOption("A")}
                        />
                        <BtnToggle
                            label="Option B"
                            selected={selectedOption === "B"}
                            onPress={() => setSelectedOption("B")}
                        />
                        <BtnToggle
                            label="Option C"
                            selected={selectedOption === "C"}
                            onPress={() => setSelectedOption("C")}
                        />
                    </BtnGroup>
                </AppCard>

                {/* ================= Input Fields ================= */}
                <AppCard gap={spacing.md}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Input Fields
                    </AppText>

                    {/* BASIC INPUT */}
                    <AppInput
                        label="Email"
                        placeholder="Enter email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* PASSWORD */}
                    <AppInput
                        label="Password"
                        placeholder="Enter password"
                        secureTextEntry
                    />

                    {/* ERROR */}
                    <AppInput
                        label="Email"
                        placeholder="Enter email"
                        error="Invalid email address"
                    />

                    {/* DISABLED */}
                    <AppInput
                        label="Username"
                        value="readonly_user"
                        editable={false}
                    />

                    {/* SEARCH */}
                    <AppInput
                        label="Search"
                        placeholder="Search products"
                        leftIcon="search"
                        value={search}
                        onChangeText={setSearch}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* OTP / CODE */}
                    <AppInput
                        label="Verification Code"
                        placeholder="123456"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        maxLength={6}
                    />

                    {/* TEXTAREA */}
                    <AppInput
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        textAlignVertical="top"
                        maxLength={50}
                        style={{ minHeight: 120 }}
                    />

                    <AppText variant="caption">
                        {bio.length}/50 characters
                    </AppText>

                    {/* PHONE */}
                    <AppInput
                        label="Phone"
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                    />

                    {/* AUTOCOMPLETE */}
                    <AppInput
                        label="AutoComplete Email"
                        placeholder="example@email.com"
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                </AppCard>

                {/* ================= Password Fields ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Password Input
                    </AppText>

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                        error="Password is required"
                    />
                </AppCard>

                {/* ================= CheckBox ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        CheckBox
                    </AppText>
                    <CheckBox
                        label="Accept Terms"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                    />
                </AppCard>

                {/* ================= RadioButton ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        RadioButton
                    </AppText>
                    <RadioButton
                        label="Male"
                        selected={gender === "male"}
                        onSelect={() => setGender("male")}
                    />

                    <RadioButton
                        label="Female"
                        selected={gender === "female"}
                        onSelect={() => setGender("female")}
                    />
                </AppCard>

                {/* ================= Text Area ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Text Area
                    </AppText>
                    <TextArea
                        label="Description"
                        placeholder="Enter details"
                        value={desc}
                        onChangeText={setDesc}
                    />
                </AppCard>

                {/* ================= OTP Fields ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        OTP Field
                    </AppText>
                    <OtpInput
                        title="Enter OTP"
                        value={otp}
                        onChange={setOtp}
                        helperText="OTP sent to your mobile"
                    />
                </AppCard>

                {/* ================= Date Input ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Date Input
                    </AppText>

                    <DateInput
                        label="Date of Birth"
                        value={date}
                        onChange={setDate}
                        minimumDate={new Date("2026-10-01")}
                    />

                    {/* Open Date Range Modal */}
                    <View style={{ marginTop: spacing.md }}>
                        <BtnApp
                            title="Select Date Range"
                            onPress={() => setOpen(true)}
                        />
                    </View>

                    <DateRangeModal
                        open={open}
                        onClose={() => setOpen(false)}
                        from={range.from}
                        to={range.to}
                        onApply={(r) => setRange(r)}
                    />
                </AppCard>

                {/* ================= Dropdown ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Dropdown
                    </AppText>

                    {/* Basic Dropdown */}
                    <AppDropdown
                        label="City"
                        value={city}
                        options={[
                            { label: "Mumbai", value: "mumbai" },
                            { label: "Pune", value: "pune" },
                            { label: "Delhi", value: "delhi" },
                        ]}
                        onChange={setCity}
                    />

                    {/* Searchable Dropdown */}
                    <AppDropdown
                        label="Country (Searchable)"
                        searchable
                        value={country}
                        options={[
                            { label: "India", value: "india" },
                            { label: "USA", value: "usa" },
                            { label: "UK", value: "uk" },
                        ]}
                        onChange={setCountry}
                    />

                    {/* Disabled Dropdown */}
                    <AppDropdown
                        label="Role (Disabled)"
                        disabled
                        value="admin"
                        options={[
                            { label: "Admin", value: "admin" },
                            { label: "User", value: "user" },
                        ]}
                        onChange={() => { }}
                    />

                    {/* Error State Dropdown */}
                    <AppDropdown
                        label="Category"
                        value={category}
                        options={[
                            { label: "Food", value: "food" },
                            { label: "Travel", value: "travel" },
                        ]}
                        error="Category is required"
                        onChange={setCategory}
                    />
                </AppCard>

                {/* ================= File Upload ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        File Upload
                    </AppText>

                    <FileUpload
                        label="Upload Image"
                        value={file}
                        onChange={setFile}
                        types={[PickerTypes.images, PickerTypes.pdf]}
                    />

                    {/* Optional: show selected file name */}
                    {file && (
                        <AppText
                            variant="caption"
                            style={{ marginTop: spacing.sm }}
                        >
                            Selected: {file.name}
                        </AppText>
                    )}
                </AppCard>

                {/* ================= Modal ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>Modal</AppText>
                    <View style={{ gap: spacing.lg }}>
                        <BtnApp
                            title="Open Modal"
                            variant="outlined"
                            fullWidth
                            onPress={() => setModalOpen(true)}
                        />

                        <AppModal
                            open={modalOpen}
                            onClose={() => setModalOpen(false)}
                            title={<AppText variant="subtitle">Confirm Action</AppText>}
                            actions={
                                <>
                                    <BtnApp title="Cancel" variant="text" onPress={() => setModalOpen(false)} />
                                    <BtnApp title="Confirm" onPress={() => setModalOpen(false)} />
                                </>
                            }
                        >
                            <AppText variant="body">
                                Are you sure you want to continue?
                            </AppText>
                        </AppModal>

                        {/* Model with table */}
                        <BtnApp
                            title="View Transactions Table"
                            variant="tonal"
                            onPress={() => setTableOpen(true)}
                        />
                        <TableModal
                            open={tableOpen}
                            onClose={() => setTableOpen(false)}
                            title="Transaction History"
                            data={[
                                { id: "TXN001", name: "Milk", amount: 120, date: "10-01-2026" },
                                { id: "TXN002", name: "Taxi", amount: 180, date: "11-01-2026" },
                                { id: "TXN003", name: "Milk", amount: 120, date: "10-01-2026" },
                                { id: "TXN004", name: "Taxi", amount: 180, date: "11-01-2026" },
                                { id: "TXN005", name: "Milk", amount: 120, date: "10-01-2026" },
                                { id: "TXN006", name: "Taxi", amount: 180, date: "11-01-2026" },
                                { id: "TXN007", name: "Milk", amount: 120, date: "10-01-2026" },
                                { id: "TXN008", name: "Taxi", amount: 180, date: "11-01-2026" },
                            ]}
                        />

                        {/* Modal with search */}
                        <BtnApp
                            title="Search Modal"
                            variant="tonal"
                            onPress={() => setSearchModal(true)}
                        />
                        <SearchFilterModal
                            open={searchModal}
                            onClose={() => setSearchModal(false)}
                            title="Select Item"
                            data={[
                                { id: "1", label: "Milk" },
                                { id: "2", label: "Groceries" },
                                { id: "3", label: "Recharge" },
                            ]}
                            onFilterPress={() => {
                                console.log("Filter clicked");
                            }}
                        />

                        {/* Modal with Image */}
                        <BtnApp
                            title="Image Modal"
                            variant="tonal"
                            onPress={() => setImgModal(true)}
                        />
                        <ImageModal
                            open={imgModal}
                            onClose={() => setImgModal(false)}
                            image={require("../assets/image.png")}
                            title="Success!"
                            description="Your transaction was completed successfully."
                            primaryLabel="Done"
                            primaryAction={() => {
                                setImgModal(false);
                            }}
                        />

                        {/* Empty Modal */}
                        <BtnApp
                            title="Empty Modal"
                            variant="tonal"
                            onPress={() => setEmptyModal(true)}
                        />
                        <EmptyStateModal
                            open={emptyModal}
                            onClose={() => setEmptyModal(false)}
                            title="No Transactions"
                            message="You have not made any transactions yet."
                            actionLabel="Okay"
                        />
                    </View>
                </AppCard>

                {/* ================= Action Sheet ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Action Sheet
                    </AppText>

                    <View style={{ gap: 20 }}>
                        {/* Normal Action Sheet */}
                        <BtnApp
                            title="Open Action Sheet"
                            onPress={() => setOpenSheet(true)}
                        />

                        {/* Filter Action Sheet */}
                        <BtnApp
                            title="Open Filter Action Sheet"
                            variant="outlined"
                            onPress={() => setOpenFilterSheet(true)}
                        />

                        {/* Image Action Sheet */}
                        <BtnApp
                            title="Open Confirm Action Sheet"
                            onPress={() => setOpenConfirm(true)}
                        />
                    </View>

                    {/* ===== Basic Action Sheet ===== */}
                    <AppActionSheet
                        open={openSheet}
                        onClose={() => setOpenSheet(false)}
                        title={<AppText variant="subtitle">Choose Option</AppText>}
                    >
                        <View style={{ gap: spacing.md }}>
                            <BtnApp title="Option 1" onPress={() => setOpenSheet(false)} />
                            <BtnApp
                                title="Option 2"
                                variant="outlined"
                                onPress={() => setOpenSheet(false)}
                            />
                            <AppInput label="Notes" placeholder="Type here..." />
                        </View>
                    </AppActionSheet>

                    {/* ===== Filter Action Sheet ===== */}
                    <FilterActionSheet
                        open={openFilterSheet}
                        onClose={() => setOpenFilterSheet(false)}
                        title="Filters"

                        /* Radio */
                        radioOptions={[
                            { label: "Most Recent", value: "recent" },
                            { label: "Oldest First", value: "oldest" },
                        ]}
                        selectedRadio={selectedRadio}
                        onRadioChange={setSelectedRadio}

                        /* Checkbox */
                        checkboxOptions={[
                            { label: "Photos", value: "photos" },
                            { label: "Videos", value: "videos" },
                            { label: "Documents", value: "docs" },
                        ]}
                        selectedCheckboxes={selectedCheckboxes}
                        onCheckboxChange={setSelectedCheckboxes}

                        /* Action */
                        primaryActionLabel="Apply Filters"
                        onPrimaryAction={() => {
                            console.log("Radio:", selectedRadio);
                            console.log("Checkbox:", selectedCheckboxes);
                            setOpenFilterSheet(false);
                        }}
                    />

                    {/* ===== Image Action Sheet ===== */}
                    <ImageActionSheet
                        open={openConfirm}
                        onClose={() => setOpenConfirm(false)}
                        image={require("../assets/image.png")}
                        title="Title of Action Sheet"
                        message="One Message Here"

                        checkboxLabel="Checkbox message"
                        checked={confirmChecked}
                        onCheckChange={() => setConfirmChecked(!confirmChecked)}

                        primaryLabel="Delete"
                        onPrimaryPress={() => {
                            if (!confirmChecked) return;
                            setOpenConfirm(false);
                        }}
                    />
                </AppCard>

                {/* ================= Accordion ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Accordion
                    </AppText>
                    <Accordion items={[
                        {
                            id: "1",
                            title: "What is React Native?",
                            content: <AppText variant="body">React Native is a mobile framework.</AppText>,
                        },
                        {
                            id: "2",
                            title: "Supported Platforms",
                            content: <AppText variant="body">Android & iOS</AppText>,
                        },
                    ]} />
                </AppCard>

                {/* ================= Chip Tags ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Chip Tags
                    </AppText>

                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                        <ChipTag label="Chip" />
                        <ChipTag label="disabled" disabled />
                        <ChipTag label="Filled" variant="filled" onPress={() => { }} />
                    </View>
                </AppCard>

                {/* ================= Vertical Stepper ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Vertical Stepper
                    </AppText>
                    <VerticalStepper steps={[
                        { id: "1", title: "Business Details", status: "completed", onPress: () => { } },
                        { id: "2", title: "Author Verification", status: "completed", onPress: () => { } },
                        { id: "3", title: "PAN Verification", status: "completed", onPress: () => { } },
                        { id: "4", title: "Document upload", status: "active" },
                        { id: "5", title: "Reference admin verification", status: "pending" },
                        { id: "6", title: "Bank Verification", status: "pending" },
                    ]} />
                </AppCard>

                {/* ================= Horizontal Stepper ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Horizontal Stepper
                    </AppText>

                    <HorizontalStepper steps={[
                        { id: "1", title: "Permissions", status: "completed" },
                        { id: "2", title: "SMS", status: "completed" },
                        { id: "3", title: "Select SIM", status: "active" },
                    ]} />
                </AppCard>

                {/* ================= Step Progress Bar ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Step Progress Bar
                    </AppText>
                    <View style={{ gap: spacing.md }}>
                        <StepProgressBar steps={3} currentStep={currentStep} />

                        <AppText variant="subtitle" style={{ textAlign: 'center', margin: spacing.lg }}>Step {currentStep}</AppText>

                        <BtnGroup style={{ justifyContent: 'space-around' }}>
                            <BtnApp
                                title="Previous"
                                onPress={() => setCurrentStep(currentStep != 1 ? currentStep - 1 : currentStep)}
                            />
                            <BtnApp
                                title="Next"
                                onPress={() => setCurrentStep(currentStep != 3 ? currentStep + 1 : currentStep)}
                            />
                        </BtnGroup>
                    </View>
                </AppCard>








                {/* ================= Icon Button ================= */}
                <AppCard gap={spacing.md}>
                    <AppText variant="title">Icon Button</AppText>

                    {/* Default */}
                    <AppText variant="subtitle">Default</AppText>
                    <BtnGroup>
                        <BtnIcon icon={<MaterialIcons name="home" size={20} />} />
                        <BtnIcon icon={<MaterialIcons name="favorite" size={20} />} />
                        <BtnIcon icon={<MaterialIcons name="settings" size={20} />} />
                    </BtnGroup>

                    {/* Selected */}
                    <AppText variant="subtitle">Selected</AppText>
                    <BtnGroup>
                        <BtnIcon
                            icon={<MaterialIcons name="code" size={20} />}
                            selected
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="favorite" size={20} />}
                            selected
                        />
                    </BtnGroup>

                    {/* Disabled */}
                    <AppText variant="subtitle">Disabled</AppText>
                    <BtnGroup>
                        <BtnIcon
                            icon={<MaterialIcons name="home" size={20} />}
                            disabled
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="favorite" size={20} />}
                            disabled
                        />
                    </BtnGroup>

                    {/* Sizes */}
                    <AppText variant="subtitle">Sizes</AppText>
                    <BtnGroup>
                        <BtnIcon
                            icon={<MaterialIcons name="home" size={18} />}
                            size={36}
                            iconSize={18}
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="home" size={20} />}
                            size={44}
                            iconSize={22}
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="home" size={24} />}
                            size={52}
                            iconSize={24}
                        />
                    </BtnGroup>

                    {/* Mixed States */}
                    <AppText variant="subtitle">Mixed States</AppText>
                    <BtnGroup>
                        <BtnIcon
                            icon={<MaterialIcons name="favorite" size={20} />}
                            selected
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="favorite" size={20} />}
                            disabled
                        />
                        <BtnIcon
                            icon={<MaterialIcons name="favorite" size={20} />}
                        />
                    </BtnGroup>

                </AppCard>

                {/* ================= Device Info Trigger ================= */}
                <AppCard style={{ margin: spacing.lg }}>
                    <AppText variant="title" style={{ marginBottom: spacing.md }}>
                        Debug Tools
                    </AppText>

                    <DeviceInfoTrigger onPress={() => setDeviceModal(true)} />
                    <DeviceInfoModal open={deviceModal} onClose={() => setDeviceModal(false)} />
                </AppCard>

            </KeyboardAwareScrollView>

            {/* ================= Floating Action Button (FAB) ================= */}
            <FABMenu
                open={fabOpen}
                onToggle={() => setFabOpen((v) => !v)}
                fabIcon={
                    <MaterialIcons
                        name={fabOpen ? "close" : "add"}
                        size={24}
                        color="#21005D"
                    />
                }
                items={[
                    {
                        key: "add",
                        label: "Add",
                        icon: (
                            <MaterialIcons
                                name="add"
                                size={22}
                                color="#21005D"
                            />
                        ),
                        onPress: () => {
                            console.log("Add pressed");
                        },
                    },
                    {
                        key: "scan",
                        label: "Scan",
                        icon: (
                            <MaterialIcons
                                name="qr-code-scanner"
                                size={22}
                                color="#21005D"
                            />
                        ),
                        onPress: () => {
                            console.log("Scan pressed");
                        },
                    },
                ]}
            />
        </SafeAreaView>
    )
}

export default KitchenSink

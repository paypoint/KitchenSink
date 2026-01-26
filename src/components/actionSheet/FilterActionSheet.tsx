import React from "react";
import { View } from "react-native";
import { AppActionSheet } from "./AppActionSheet";
import { RadioButton } from "../inputs/RadioButton";
import { CheckBox } from "../inputs/CheckBox";
import { BtnApp } from "../buttons/BtnApp";
import { AppText } from "../AppText";
import { spacing } from "../../theme";

/* ================= TYPES ================= */

type Option = {
  label: string;
  value: string;
};

type FilterActionSheetProps = {
  open: boolean;                                 // Modal visibility
  onClose: () => void;                           // Close callback

  title?: string;                                // Sheet title

  /* Radio (optional) */
  radioOptions?: Option[];                       // Single selection items
  selectedRadio?: string;                        // Current selected value
  onRadioChange?: (value: string) => void;       // Radio selection handler

  /* Checkbox (optional) */
  checkboxOptions?: Option[];                    // Multiple selection items
  selectedCheckboxes?: string[];                 // Current selected values
  onCheckboxChange?: (values: string[]) => void; // Checkbox selection handler

  /* Action */
  primaryActionLabel?: string;                   // Action button text
  onPrimaryAction?: () => void;                  // Action button handler
};

/* ================= COMPONENT ================= */

export function FilterActionSheet({
  open,
  onClose,
  title,

  radioOptions,
  selectedRadio,
  onRadioChange,

  checkboxOptions,
  selectedCheckboxes = [],
  onCheckboxChange,

  primaryActionLabel = "Apply",
  onPrimaryAction,
}: FilterActionSheetProps) {
  return (
    <AppActionSheet
      open={open}
      onClose={onClose}
      title={title ? <AppText variant="title">{title}</AppText> : undefined}
    >
      {/* ===== Radio Section ===== */}
      {radioOptions?.length ? (
        <View style={{ marginBottom: spacing.lg }}>
          {radioOptions.map(option => (
            <RadioButton
              key={option.value}
              label={option.label}
              selected={selectedRadio === option.value}
              onSelect={() => onRadioChange?.(option.value)}
            />
          ))}
        </View>
      ) : null}

      {/* ===== Checkbox Section ===== */}
      {checkboxOptions?.length ? (
        <View style={{ marginBottom: spacing.lg }}>
          {checkboxOptions.map(option => {
            const checked = selectedCheckboxes.includes(option.value);

            return (
              <CheckBox
                key={option.value}
                label={option.label}
                checked={checked}
                onChange={() => {
                  if (!onCheckboxChange) return;

                  if (checked) {
                    onCheckboxChange(
                      selectedCheckboxes.filter(v => v !== option.value)
                    );
                  } else {
                    onCheckboxChange([...selectedCheckboxes, option.value]);
                  }
                }}
              />
            );
          })}
        </View>
      ) : null}

      {/* ===== Action Button ===== */}
      {onPrimaryAction ? (
        <BtnApp
          title={primaryActionLabel}
          onPress={onPrimaryAction}
        />
      ) : null}
    </AppActionSheet>
  );
}

/*
Usage Examples:

<FilterActionSheet
  open={showFilter}
  onClose={() => setShowFilter(false)}
  title="Sort By"
  radioOptions={[
    { label: "Newest", value: "new" },
    { label: "Oldest", value: "old" },
  ]}
  selectedRadio={sort}
  onRadioChange={setSort}
/>
*/

import {computed, type ComputedRef, nextTick, ref, type Ref} from "vue";
import type {DropdownOption, DropdownProps} from "@/ui/UiDropdown/types.ts";

type DropDownReturnShape = {
  isOpen: Ref<boolean>
  dropdownRef: Ref<HTMLElement | undefined>
  filterInputRef: Ref<HTMLElement | undefined>
  filterValue: Ref<string>
  filteredOptions: ComputedRef<DropdownOption[]>
  toggleDropdown: () => void
  selectOption: (option: DropdownOption) => void
}

export const useDropdown = (props: DropdownProps, selectedValue: Ref<string>): DropDownReturnShape => {


  const isOpen = ref(false)
  const filterValue = ref('')
  const dropdownRef = ref<HTMLElement | undefined>()
  const filterInputRef = ref<HTMLInputElement | undefined>()

  const filteredOptions = computed(() => {
    if (!props.isFilter || !filterValue.value) {
      return props.options
    }

    return props.options.filter(option =>
      option.label.toLowerCase().includes(filterValue.value.toLowerCase())
    )
  })


  const toggleDropdown = () => {
    if (props.isDisabled) {
      return
    }

    if (isOpen.value) {
      nextTick(() => {
        filterInputRef.value?.focus()
      })
      isOpen.value = false
      filterValue.value = ''
    }else {
      isOpen.value = true
    }
  }

  const selectOption = (option: DropdownOption) => {
    if (option.disabled) {
      return
    }

    selectedValue.value = option.value
    isOpen.value = false
  }


  return {
    isOpen,
    filteredOptions,
    dropdownRef,
    filterInputRef,
    filterValue,
    toggleDropdown,
    selectOption
  }
}
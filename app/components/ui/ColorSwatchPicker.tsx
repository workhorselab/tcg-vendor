import {
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  type ColorSwatchPickerItemProps,
  type ColorSwatchPickerProps,
  composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorSwatch } from "~/components/ui/ColorSwatch";
import { focusRing } from "~/lib/react-aria-utils";

const pickerStyles = tv({
  base: "flex gap-1",
  variants: {
    layout: {
      stack: "flex-col",
      grid: "flex-wrap",
    },
  },
});

export function ColorSwatchPicker({
  children,
  ...props
}: Omit<ColorSwatchPickerProps, "layout">) {
  return (
    <AriaColorSwatchPicker
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        pickerStyles({ ...renderProps, className }),
      )}
    >
      {children}
    </AriaColorSwatchPicker>
  );
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative rounded-xs [-webkit-tap-highlight-color:transparent]",
});

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
  return (
    <AriaColorSwatchPickerItem {...props} className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 w-full h-full box-border border-2 border-black dark:border-white outline-2 outline-white dark:outline-black -outline-offset-4 rounded-md forced-color-adjust-none" />
          )}
        </>
      )}
    </AriaColorSwatchPickerItem>
  );
}

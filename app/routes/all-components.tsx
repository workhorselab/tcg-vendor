import {
  Button as AriaButton,
  Popover as AriaPopover,
  Breadcrumb,
  DisclosurePanel,
  GridListItem,
  Label,
  ListBoxItem,
  MenuItem,
  MenuTrigger,
  Radio,
  Tab,
  TabList,
  TabPanel,
  Tag,
  TreeItem,
  parseColor,
} from "react-aria-components";
import { Breadcrumbs } from "~/components/ui/Breadcrumbs";
import { Button } from "~/components/ui/Button";
import { Calendar } from "~/components/ui/Calendar";
import { Checkbox } from "~/components/ui/Checkbox";
import { CheckboxGroup } from "~/components/ui/CheckboxGroup";
import { ColorArea } from "~/components/ui/ColorArea";
import { ColorField } from "~/components/ui/ColorField";
import { ColorPicker } from "~/components/ui/ColorPicker";
import { ColorSlider } from "~/components/ui/ColorSlider";
import { ColorSwatch } from "~/components/ui/ColorSwatch";
import { ColorSwatchPicker } from "~/components/ui/ColorSwatchPicker";
import { ColorWheel } from "~/components/ui/ColorWheel";
import { ComboBox } from "~/components/ui/ComboBox";
import { DateField } from "~/components/ui/DateField";
import { DatePicker } from "~/components/ui/DatePicker";
import { DateRangePicker } from "~/components/ui/DateRangePicker";
import { Disclosure } from "~/components/ui/Disclosure";
import { DisclosureGroup } from "~/components/ui/DisclosureGroup";
import { DropZone } from "~/components/ui/DropZone";
import { FieldButton } from "~/components/ui/FieldButton";
import { Form } from "~/components/ui/Form";
import { GridList } from "~/components/ui/GridList";
import { Link } from "~/components/ui/Link";
import { ListBox } from "~/components/ui/ListBox";
import { Menu } from "~/components/ui/Menu";
import { Meter } from "~/components/ui/Meter";
import { NumberField } from "~/components/ui/NumberField";
import { ProgressBar } from "~/components/ui/ProgressBar";
import { RadioGroup } from "~/components/ui/RadioGroup";
import { RangeCalendar } from "~/components/ui/RangeCalendar";
import { SearchField } from "~/components/ui/SearchField";
import { Select, SelectItem } from "~/components/ui/Select";
import { Separator } from "~/components/ui/Separator";
import { Slider } from "~/components/ui/Slider";
import { Switch } from "~/components/ui/Switch";
import { Tabs } from "~/components/ui/Tabs";
import { TagGroup } from "~/components/ui/TagGroup";
import { TextField } from "~/components/ui/TextField";
import { TimeField } from "~/components/ui/TimeField";
import { ToggleButton } from "~/components/ui/ToggleButton";
import { ToggleButtonGroup } from "~/components/ui/ToggleButtonGroup";
import { Toolbar } from "~/components/ui/Toolbar";
import { Tooltip } from "~/components/ui/Tooltip";
import { Tree } from "~/components/ui/Tree";
import type { Route } from "./+types/all-components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Component Showcase" },
    { name: "description", content: "Browse all available UI components" },
  ];
}

export default function Components() {
  const componentExamples: Record<
    string,
    { category: string; component: React.ReactNode }
  > = {
    Button: {
      category: "Actions",
      component: (
        <div className="flex gap-2">
          <Button variant="primary">Button</Button>
        </div>
      ),
    },
    ToggleButton: {
      category: "Actions",
      component: <ToggleButton>Toggle</ToggleButton>,
    },
    ToggleButtonGroup: {
      category: "Actions",
      component: (
        <ToggleButtonGroup>
          <ToggleButton>Left</ToggleButton>
          <ToggleButton>Right</ToggleButton>
        </ToggleButtonGroup>
      ),
    },
    Toolbar: {
      category: "Actions",
      component: (
        <Toolbar>
          <Button variant="quiet">Action</Button>
        </Toolbar>
      ),
    },
    GridList: {
      category: "Collections",
      component: (
        <GridList className="w-32">
          <GridListItem className="text-sm">Item 1</GridListItem>
          <GridListItem className="text-sm">Item 2</GridListItem>
        </GridList>
      ),
    },
    ListBox: {
      category: "Collections",
      component: (
        <ListBox className="w-32">
          <ListBoxItem className="text-sm">Item 1</ListBoxItem>
          <ListBoxItem className="text-sm">Item 2</ListBoxItem>
        </ListBox>
      ),
    },
    Table: {
      category: "Collections",
      component: (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Table component
        </div>
      ),
    },
    TagGroup: {
      category: "Collections",
      component: (
        <TagGroup>
          <Tag className="text-sm">Tag 1</Tag>
          <Tag className="text-sm">Tag 2</Tag>
        </TagGroup>
      ),
    },
    Tree: {
      category: "Collections",
      component: (
        <Tree>
          <TreeItem textValue="Tree Item" className="text-sm">
            Tree Item
          </TreeItem>
        </Tree>
      ),
    },
    ColorArea: {
      category: "Color",
      component: (
        <ColorArea className="w-24 h-24" defaultValue={parseColor("#0066cc")} />
      ),
    },
    ColorField: {
      category: "Color",
      component: <ColorField defaultValue="#0066cc" />,
    },
    ColorPicker: {
      category: "Color",
      component: <ColorPicker defaultValue="#0066cc" />,
    },
    ColorSlider: {
      category: "Color",
      component: (
        <ColorSlider
          channel="hue"
          defaultValue={parseColor("hsl(0, 100%, 50%)")}
        />
      ),
    },
    ColorSwatch: {
      category: "Color",
      component: (
        <ColorSwatch className="w-8 h-8" color={parseColor("#0066cc")} />
      ),
    },
    ColorSwatchPicker: {
      category: "Color",
      component: <ColorSwatchPicker defaultValue="#0066cc" />,
    },
    ColorWheel: {
      category: "Color",
      component: (
        <ColorWheel className="w-24 h-24" defaultValue="hsl(0, 100%, 50%)" />
      ),
    },
    Calendar: {
      category: "Date & Time",
      component: <Calendar />,
    },
    DateField: {
      category: "Date & Time",
      component: <DateField />,
    },
    DatePicker: {
      category: "Date & Time",
      component: <DatePicker />,
    },
    DateRangePicker: {
      category: "Date & Time",
      component: <DateRangePicker />,
    },
    RangeCalendar: {
      category: "Date & Time",
      component: <RangeCalendar />,
    },
    TimeField: {
      category: "Date & Time",
      component: <TimeField />,
    },
    Toast: {
      category: "Feedback",
      component: (
        <div className="text-sm p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
          Toast message
        </div>
      ),
    },
    Checkbox: {
      category: "Forms",
      component: (
        <Checkbox>
          <Label>Checkbox</Label>
        </Checkbox>
      ),
    },
    CheckboxGroup: {
      category: "Forms",
      component: (
        <CheckboxGroup>
          <Checkbox>
            <Label>Option 1</Label>
          </Checkbox>
        </CheckboxGroup>
      ),
    },
    ComboBox: {
      category: "Forms",
      component: (
        <ComboBox placeholder="Select...">
          <ListBoxItem>Option 1</ListBoxItem>
          <ListBoxItem>Option 2</ListBoxItem>
        </ComboBox>
      ),
    },
    DropZone: {
      category: "Forms",
      component: (
        <DropZone className="border-2 border-dashed p-4 text-sm rounded">
          Drop files
        </DropZone>
      ),
    },
    Field: {
      category: "Forms",
      component: (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Field components (Label, Description, FieldError)
        </div>
      ),
    },
    FieldButton: {
      category: "Forms",
      component: <FieldButton>📅</FieldButton>,
    },
    Form: {
      category: "Forms",
      component: <Form className="text-sm">Form</Form>,
    },
    NumberField: {
      category: "Forms",
      component: <NumberField />,
    },
    RadioGroup: {
      category: "Forms",
      component: (
        <RadioGroup>
          <Radio value="1">
            <Label>Option 1</Label>
          </Radio>
        </RadioGroup>
      ),
    },
    SearchField: {
      category: "Forms",
      component: <SearchField />,
    },
    Select: {
      category: "Forms",
      component: (
        <Select placeholder="Select">
          <SelectItem>Option 1</SelectItem>
        </Select>
      ),
    },
    Slider: {
      category: "Forms",
      component: <Slider />,
    },
    Switch: {
      category: "Forms",
      component: (
        <Switch>
          <Label>Switch</Label>
        </Switch>
      ),
    },
    TextField: {
      category: "Forms",
      component: <TextField />,
    },
    Disclosure: {
      category: "Layout",
      component: (
        <Disclosure>
          <AriaButton slot="trigger" className="text-sm">
            Disclosure
          </AriaButton>
          <DisclosurePanel>
            <div className="text-sm p-2">Content</div>
          </DisclosurePanel>
        </Disclosure>
      ),
    },
    DisclosureGroup: {
      category: "Layout",
      component: (
        <DisclosureGroup>
          <Disclosure>
            <AriaButton slot="trigger" className="text-sm">
              Item 1
            </AriaButton>
            <DisclosurePanel>
              <div className="text-sm p-2">Content</div>
            </DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      ),
    },
    Separator: {
      category: "Layout",
      component: <Separator />,
    },
    Breadcrumbs: {
      category: "Navigation",
      component: (
        <Breadcrumbs className="text-sm">
          <Breadcrumb>
            <Link href="#">Home</Link>
          </Breadcrumb>
          <Breadcrumb>
            <Link href="#">Page</Link>
          </Breadcrumb>
        </Breadcrumbs>
      ),
    },
    CommandPalette: {
      category: "Navigation",
      component: (
        <div className="text-sm p-2 bg-neutral-100 dark:bg-neutral-800 rounded">
          Command Palette
        </div>
      ),
    },
    Link: {
      category: "Navigation",
      component: <Link href="#">Link</Link>,
    },
    Tabs: {
      category: "Navigation",
      component: (
        <Tabs className="text-sm">
          <TabList>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
          </TabList>
          <TabPanel id="tab1">Content 1</TabPanel>
          <TabPanel id="tab2">Content 2</TabPanel>
        </Tabs>
      ),
    },
    AlertDialog: {
      category: "Overlays",
      component: (
        <Button variant="secondary" className="text-sm">
          Alert Dialog
        </Button>
      ),
    },
    Dialog: {
      category: "Overlays",
      component: (
        <Button variant="secondary" className="text-sm">
          Dialog
        </Button>
      ),
    },
    Menu: {
      category: "Overlays",
      component: (
        <MenuTrigger>
          <Button variant="secondary" className="text-sm">
            Menu
          </Button>
          <AriaPopover>
            <Menu>
              <MenuItem>Option 1</MenuItem>
              <MenuItem>Option 2</MenuItem>
            </Menu>
          </AriaPopover>
        </MenuTrigger>
      ),
    },
    Modal: {
      category: "Overlays",
      component: (
        <Button variant="secondary" className="text-sm">
          Modal
        </Button>
      ),
    },
    Popover: {
      category: "Overlays",
      component: (
        <Button variant="secondary" className="text-sm">
          Popover
        </Button>
      ),
    },
    Tooltip: {
      category: "Overlays",
      component: (
        <Tooltip>
          <Button variant="secondary" className="text-sm">
            Tooltip
          </Button>
        </Tooltip>
      ),
    },
    Meter: {
      category: "Status",
      component: <Meter value={50} />,
    },
    ProgressBar: {
      category: "Status",
      component: <ProgressBar value={65} />,
    },
  };

  const categories = Array.from(
    new Set(Object.values(componentExamples).map((c) => c.category)),
  ).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Component Showcase
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse all {Object.keys(componentExamples).length} available UI
            components built with React Aria
          </p>
        </header>

        {/* Interactive Examples Section */}
        <section className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Live Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Buttons
              </h3>
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="quiet">Quiet</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Text Input
              </h3>
              <TextField placeholder="Enter your name..." />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number Input
              </h3>
              <NumberField defaultValue={10} minValue={0} maxValue={100} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Search Field
              </h3>
              <SearchField placeholder="Search..." />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Select
              </h3>
              <Select placeholder="Choose an option">
                <SelectItem>Option 1</SelectItem>
                <SelectItem>Option 2</SelectItem>
                <SelectItem>Option 3</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Switch
              </h3>
              <Switch>
                <Label>Enable notifications</Label>
              </Switch>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Checkbox
              </h3>
              <Checkbox>
                <Label>Accept terms and conditions</Label>
              </Checkbox>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Radio Group
              </h3>
              <RadioGroup defaultValue="1">
                <Radio value="1">
                  <Label>Option 1</Label>
                </Radio>
                <Radio value="2">
                  <Label>Option 2</Label>
                </Radio>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Slider
              </h3>
              <Slider defaultValue={50} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress Bar
              </h3>
              <ProgressBar value={65} />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Toggle Button
              </h3>
              <ToggleButton>Toggle Me</ToggleButton>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Link
              </h3>
              <Link href="https://react-spectrum.adobe.com/react-aria/">
                Visit React Aria
              </Link>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Component List by Category */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            All Components
          </h2>
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(componentExamples)
                    .filter(([_, { category: cat }]) => cat === category)
                    .map(([name, { component }]) => (
                      <div
                        key={name}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                      >
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                          {name}
                        </p>
                        <div className="flex items-center justify-center min-h-[60px]">
                          {component}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            All components are built with{" "}
            <Link href="https://react-spectrum.adobe.com/react-aria/">
              React Aria Components
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

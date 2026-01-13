// src/demo-data/generator.ts
import randomSeed from './random';

type RandomFn = () => number;

type GeneratorContext<R extends Record<string, unknown>> = {
    random: RandomFn;
    index: number;
    record: R;
};

type GeneratorFn<R extends Record<string, unknown>, V> = (ctx: GeneratorContext<R>) => V;

// 1) values can be:
// - array of primitives/objects: ['Asia', 'Europe'] or [{model:'BMW'}]
// - function generator: ({random}) => number
// - dependent values: ['gender', { Male: [...], Female: [...] }]
type DependentSpec<R extends Record<string, unknown>> = [keyof R & string, Record<string, ColumnValues<R>>];

type ColumnValues<R extends Record<string, unknown>> =
    | readonly (string | number | boolean | Record<string, unknown>)[]
    | GeneratorFn<R, unknown>
    | DependentSpec<R>;

type ColumnValuesMap<R extends Record<string, unknown>> = Record<string, ColumnValues<R>>;

// ---------- demo data ----------
const femaleFirstNames = ['Mary', 'Linda', 'Barbara', 'Maria', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Sharon'] as const;
const maleFirstNames = ['James', 'John', 'Robert', 'William', 'David', 'Richard', 'Thomas', 'Paul', 'Mark'] as const;

const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Johnson',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
    'Anderson',
    'Thomas',
    'Jackson',
    'Williams',
    'White',
    'Harris',
    'Davis',
    'Martin',
    'Thompson',
    'Garcia',
    'Martinez',
    'Robinson',
    'Clark'
] as const;

type USState = { name: string; abbr: string };

const usStates: readonly USState[] = [
    { name: 'Alabama', abbr: 'AL' },
    { name: 'Alaska', abbr: 'AK' },
    { name: 'American Samoa', abbr: 'AS' },
    { name: 'Arizona', abbr: 'AZ' },
    { name: 'Arkansas', abbr: 'AR' },
    { name: 'California', abbr: 'CA' },
    { name: 'Colorado', abbr: 'CO' },
    { name: 'Connecticut', abbr: 'CT' },
    { name: 'Delaware', abbr: 'DE' },
    { name: 'District Of Columbia', abbr: 'DC' },
    { name: 'Federated States Of Micronesia', abbr: 'FM' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Guam', abbr: 'GU' },
    { name: 'Hawaii', abbr: 'HI' },
    { name: 'Idaho', abbr: 'ID' },
    { name: 'Illinois', abbr: 'IL' },
    { name: 'Indiana', abbr: 'IN' },
    { name: 'Iowa', abbr: 'IA' },
    { name: 'Kansas', abbr: 'KS' },
    { name: 'Kentucky', abbr: 'KY' },
    { name: 'Louisiana', abbr: 'LA' },
    { name: 'Maine', abbr: 'ME' },
    { name: 'Marshall Islands', abbr: 'MH' },
    { name: 'Maryland', abbr: 'MD' },
    { name: 'Massachusetts', abbr: 'MA' },
    { name: 'Michigan', abbr: 'MI' },
    { name: 'Minnesota', abbr: 'MN' },
    { name: 'Mississippi', abbr: 'MS' },
    { name: 'Missouri', abbr: 'MO' },
    { name: 'Montana', abbr: 'MT' },
    { name: 'Nebraska', abbr: 'NE' },
    { name: 'Nevada', abbr: 'NV' },
    { name: 'New Hampshire', abbr: 'NH' },
    { name: 'New Jersey', abbr: 'NJ' },
    { name: 'New Mexico', abbr: 'NM' },
    { name: 'New York', abbr: 'NY' },
    { name: 'North Carolina', abbr: 'NC' },
    { name: 'North Dakota', abbr: 'ND' },
    { name: 'Northern Mariana Islands', abbr: 'MP' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'Oklahoma', abbr: 'OK' },
    { name: 'Oregon', abbr: 'OR' },
    { name: 'Palau', abbr: 'PW' },
    { name: 'Pennsylvania', abbr: 'PA' },
    { name: 'Puerto Rico', abbr: 'PR' },
    { name: 'Rhode Island', abbr: 'RI' },
    { name: 'South Carolina', abbr: 'SC' },
    { name: 'South Dakota', abbr: 'SD' },
    { name: 'Tennessee', abbr: 'TN' },
    { name: 'Texas', abbr: 'TX' },
    { name: 'Utah', abbr: 'UT' },
    { name: 'Vermont', abbr: 'VT' },
    { name: 'Virgin Islands', abbr: 'VI' },
    { name: 'Virginia', abbr: 'VA' },
    { name: 'Washington', abbr: 'WA' },
    { name: 'West Virginia', abbr: 'WV' },
    { name: 'Wisconsin', abbr: 'WI' },
    { name: 'Wyoming', abbr: 'WY' }
] as const;

const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Las Vegas',
    'Austin',
    'Tokyo',
    'Rio de Janeiro',
    'London',
    'Paris'
] as const;

const cars = [
    'Honda Civic',
    'Toyota Corolla',
    'Chevrolet Cruze',
    'Honda Accord',
    'Nissan Altima',
    'Kia Optima',
    'Audi A4',
    'BMW 750'
] as const;

const positions = [
    'CEO',
    'IT Manager',
    'Ombudsman',
    'CMO',
    'Controller',
    'HR Manager',
    'Shipping Manager',
    'Sales Assistant',
    'HR Assistant'
] as const;

// ---------- helpers ----------
type DatePart = number | ((rand: RandomFn) => number);

type GenerateDateArgs = {
    random: RandomFn;
    year?: DatePart;
    month?: DatePart;
    day?: DatePart;
};

const generateDate = ({
    random,
    year = 2017,
    month = (rand: RandomFn) => Math.floor(rand() * 12),
    day = (rand: RandomFn) => Math.floor(rand() * 30) + 1
}: GenerateDateArgs): string => {
    const getPart = (part: DatePart) => (typeof part === 'function' ? part(random) : part);
    const date = new Date(Date.UTC(getPart(year), getPart(month), getPart(day)));

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(
        2,
        '0'
    )}`;
};

const generatePhone = (): string =>
    Math.random()
        .toString()
        .slice(2, 12)
        .replace(/(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');

// ---------- exported demo presets ----------
export const defaultColumnValues = {
    gender: ['Male', 'Female'],
    name: [
        'gender',
        {
            Male: [...maleFirstNames],
            Female: [...femaleFirstNames]
        }
    ],
    city: [...cities],
    car: [...cars]
} satisfies ColumnValuesMap<Record<string, unknown>>;

export const defaultNestedColumnValues = {
    user: [
        ...[...maleFirstNames, ...femaleFirstNames].map((name, i) => ({
            firstName: name,
            lastName: lastNames[i] ?? lastNames[lastNames.length - 1]
        }))
    ],
    position: [...positions],
    city: [...cities],
    car: cars.map((car) => ({ model: car }))
} satisfies ColumnValuesMap<Record<string, unknown>>;

export const globalSalesValues = {
    region: ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'],
    sector: ['Energy', 'Health', 'Manufacturing', 'Insurance', 'Banking', 'Telecom'],
    channel: ['Resellers', 'Retail', 'VARs', 'Consultants', 'Direct', 'Telecom'],
    units: ({ random }: { random: RandomFn }) => Math.floor(random() * 4) + 1,
    customer: [
        'Renewable Supplies',
        'Energy Systems',
        'Environment Solar',
        'Beacon Systems',
        'Apollo Inc',
        'Gemini Stores',
        'McCord Builders',
        'Building M Inc',
        'Global Services',
        'Market Eco',
        'Johnson & Assoc',
        'Get Solar Inc',
        'Supply Warehouse',
        'Discovery Systems',
        'Mercury Solar'
    ],
    product: ['SolarMax', 'SolarOne', 'EnviroCare', 'EnviroCare Max'],
    amount: ({ random }: { random: RandomFn }) => Math.floor(random() * 1000000 + 1000) / 20,
    discount: ({ random }: { random: RandomFn }) => Math.round(random() * 0.5 * 1000) / 1000,
    saleDate: ({ random }: { random: RandomFn }) =>
        generateDate({
            random,
            year: 2016,
            month: () => Math.floor(random() * 3) + 1
        }),
    shipped: [true, false]
} satisfies ColumnValuesMap<Record<string, unknown>>;

export const employeeValues = {
    gender: ['Male', 'Female'],
    prefix: [
        'gender',
        {
            Male: ['Mr.', 'Dr.'],
            Female: ['Mrs.', 'Ms.', 'Dr.']
        }
    ],
    firstName: [
        'gender',
        {
            Male: [...maleFirstNames],
            Female: [...femaleFirstNames]
        }
    ],
    lastName: [...lastNames],
    position: [...positions],
    state: usStates.map((state) => state.name),
    birthDate: ({ random }: { random: RandomFn }) =>
        generateDate({
            random,
            year: () => Math.floor(random() * 30) + 1960
        }),
    phone: () => generatePhone()
} satisfies ColumnValuesMap<Record<string, unknown>>;

export const employeeTaskValues = {
    priority: ['High', 'Low', 'Normal'],
    status: ['Completed', 'In Progress', 'Deferred', 'Need Assistance'],
    subject: [
        'Choose between PPO and HMO Health Plan',
        'Google AdWords Strategy',
        'New Brochures',
        'Update NDA Agreement',
        'Review Product Recall Report by Engineering Team',
        'Update Personnel Files',
        'Review Health Insurance Options Under the Affordable Care Act',
        'Non-Compete Agreements',
        'Give Final Approval for Refunds',
        'Deliver R&D Plans',
        'Decide on Mobile Devices to Use in the Field',
        'Try New Touch-Enabled Apps',
        'Approval on Converting to New HDMI Specification',
        'Approve Hiring',
        'Update Employee Files with New NDA',
        'Provide New Health Insurance Docs',
        'Prepare 3013 Marketing Plan',
        'Rollout of New Website and Marketing Brochures',
        'Review Sales Report and Approve Plans',
        'Review Site Up-Time Report',
        'Review HR Budget Company Wide',
        'Final Budget Review',
        'Sign Updated NDA',
        'Review Overtime Report',
        'Upgrade Server Hardware',
        'Upgrade Personal Computers',
        'Prepare Financial',
        'Update Revenue Projections',
        'Submit D&B Number to ISP for Credit Approval',
        'Update Sales Strategy Documents',
        'Refund Request Template'
    ],
    startDate: ({ random }: { random: RandomFn }) =>
        generateDate({
            random,
            year: 2016
        }),
    dueDate: ({ random, record }: { random: RandomFn; record: Record<string, unknown> }) =>
        generateDate({
            random,
            year: 2016,
            month: () => Math.floor(random() * 2) + new Date(String(record.startDate)).getMonth()
        })
} satisfies ColumnValuesMap<Record<string, unknown>>;

// ---------- core ----------
function isDependentSpec<R extends Record<string, unknown>>(v: ColumnValues<R>): v is DependentSpec<R> {
    return Array.isArray(v) && v.length === 2 && typeof v[0] === 'string' && typeof v[1] === 'object' && v[1] !== null;
}

function pickFromArray<T>(arr: readonly T[], random: RandomFn): T {
    return arr[Math.floor(random() * arr.length)];
}

function cloneIfObject(value: unknown): unknown {
    if (value !== null && typeof value === 'object') {
        return { ...(value as Record<string, unknown>) };
    }
    return value;
}

function resolveValues<R extends Record<string, unknown>>(values: ColumnValues<R>, record: R): ColumnValues<R> {
    let current: ColumnValues<R> = values;

    while (isDependentSpec(current)) {
        const [dependsOnKey, map] = current;
        const dependsOnValue = String(record[dependsOnKey] ?? '');
        current = map[dependsOnValue];
    }

    return current;
}

export type GenerateRowsOptions<R extends Record<string, unknown> = Record<string, unknown>> = {
    columnValues?: ColumnValuesMap<R>;
    length: number;
    random?: RandomFn;
};

export function generateRows<R extends Record<string, unknown>>({
    columnValues = defaultColumnValues as unknown as ColumnValuesMap<R>,
    length,
    random = randomSeed(329972281)
}: GenerateRowsOptions<R>): R[] {
    const data: R[] = [];
    const columns = Object.keys(columnValues) as (keyof ColumnValuesMap<R>)[];

    for (let i = 0; i < length; i += 1) {
        const record = {} as R;

        columns.forEach((column) => {
            const raw = (columnValues as ColumnValuesMap<R>)[column as string];
            const resolved = resolveValues(raw, record);

            if (typeof resolved === 'function') {
                (record as Record<string, unknown>)[column as string] = resolved({ random, index: i, record });
                return;
            }

            // now resolved is an array
            const value = pickFromArray(resolved as readonly unknown[], random);
            (record as Record<string, unknown>)[column as string] = cloneIfObject(value);
        });

        data.push(record);
    }

    return data;
}

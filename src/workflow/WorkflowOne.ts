

async function Activity1(input: number): Promise<number> {
    return input * 2;
}

async function Activity2(input: number): Promise<number> {
    return input - 1;
}

async function Activity3(input: number): Promise<number> {
    return input + 5;
}

export async function WorkflowOne(input: number): Promise<number> {
    let state = 0;

    state += await Activity1(input);

    state += await Activity2(input);

    state += await Activity3(input);

    return state;
}
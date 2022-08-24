

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
    const activity1Output = await Activity1(input);
    state += activity1Output;

    const activity2Output = await Activity2(input);
    state += activity2Output;

    const activity3Output = await Activity3(input);
    state += activity3Output;

    return state;
}
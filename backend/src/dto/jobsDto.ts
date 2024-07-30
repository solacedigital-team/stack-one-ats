
type jobStatus = {
    value: String;
    source_value: String | Number | Boolean;
}
type job = {
    id: String;
    title: String;
    created_at: Date; // to be tested
    updated_at: Date;
    job_status: jobStatus[]; // verify the data structure
}
type data = {
    jobs: job[];
}
export type JobsList = {
    next: String;
    data: data;
}

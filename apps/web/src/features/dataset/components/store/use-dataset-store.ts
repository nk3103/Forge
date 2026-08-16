interface ForgeState {
    dataset?: DatasetState

    operations: Operation[]

    setDataset()

    applyOperation()

    reset()
}
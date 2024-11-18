const SearchPage = ({ orgId, selectedUsers, setSelectedUsers }) => {
    /**
     * Config and bootstrap
     */
    const dispatch = useDispatch();
    const {
        member: { type: userRole },
    } = useSelector((state) => state.organizationDetails || {});

    const { emailValidation } = userSearchValidation;
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        if (userRole === "member") {
            history.push(generatePath(baseRoute, { orgId: orgId }));
        }
    }, [userRole]);

    /**
     * Form Submission
     */
    const { register, formState, handleSubmit, resetField, setValue } = useForm();
    const history = useHistory();
    /**
     * Search box
     */
    const [isLoading, setLoading] = useState(false);

    const defaultMessage = " ";
    const [message, setMessage] = useState(defaultMessage);

    const searchUser = (formData) => {
        // hit api to get users with the email id
        setError();
        const searchEmail = formData["searchUsers"]?.toLowerCase();
        if (searchEmail) {
            setLoading(true);
            searchUsers(orgId, searchEmail, dispatch)
                .then((users) => {
                    const user = users[searchEmail];
                    if (!_.isEmpty(user)) {
                        getTeam(orgId, user._id, 1, 5, dispatch)
                            .then((response) => {
                                user["type"] = response.data.team[0].type;
                                user["_id"] = response.data.team[0]._id;
                                const users = {};
                                users[user.email] = user;
                                setSearchResults({
                                    ...users,
                                });
                                setLoading(false);
                            })
                            .catch(() => {
                                setSearchResults({
                                    ...users,
                                });
                                setLoading(false);
                            });
                    }
                })
                .catch((err) => {
                    console.error("Error fetching users");
                    console.error({ ...err });
                    setSearchResults({});
                    setLoading(false);
                    setError(err);
                });
        }
    };
    const debouncedSearch = useMemo(() => _.debounce(searchUser, 400, { trailing: true }), []);

    useEffect(() => {
        if (!error) return;
        if (error.response?.status === 404) {
            setMessage("User not found");
        } else {
            setMessage(error.message || "No users found");
        }
    }, [error]);

    const removeUserFromList = (userIdx) => {
        setSelectedUsers((selectedUsers) => {
            selectedUsers = [...selectedUsers];
            selectedUsers.splice(userIdx, 1);
            return selectedUsers;
        });
    };

    return (
        <>
            <ComponentHeader hideSearchIcon>
                <BackButton onClick={() => history.goBack()} />
                <HeaderTitle>Add a New Member</HeaderTitle>
            </ComponentHeader>

            <Body>
                <SearchForm onSubmit={handleSubmit(debouncedSearch)} noValidate>
                    <SearchWrapper>
                        <InputWrapper>
                            <Label>Search User</Label>
                            <CustomTextInput
                                name="searchUsers"
                                label="searchUsers"
                                autoComplete="off"
                                validation={emailValidation}
                                register={register}
                                placeholder="Invite members via Email"
                                height="50px"
                                data-testid="search-input"
                                margin="0"
                                error={formState.errors.searchUsers}
                                onChange={(e) => {
                                    setValue("searchUsers", e.target.value);
                                    handleSubmit(debouncedSearch)();
                                }}
                                selectedComponents={selectedUsers.map((user, idx) => {
                                    return (
                                        <SelectedUser>
                                            {user.email}{" "}
                                            <Cross onClick={() => removeUserFromList(idx)} />
                                        </SelectedUser>
                                    );
                                })}
                            >
                                <SearchIcon width="20" height="20" />
                            </CustomTextInput>
                            <ValidationMessage>
                                {formState.errors.searchUsers?.type === "required"
                                    ? "Field required"
                                    : ""}
                                {formState.errors.searchUsers?.type === "pattern"
                                    ? `Please enter a valid email`
                                    : ""}
                            </ValidationMessage>
                        </InputWrapper>
                    </SearchWrapper>
                </SearchForm>
                {isLoading ? (
                    <Loader>
                        <LoaderIcon />
                    </Loader>
                ) : (
                    <SearchResults>
                        {_.isEmpty(searchResults) ? (
                            <NoAppFound>
                                <UserGroup />
                                {/* <WorkInProgress /> */}
                                <Message style={{ paddingTop: "1em" }} data-testid="no-apps-found">
                                    {!error && searchMessage}
                                    {error && message}
                                </Message>
                            </NoAppFound>
                        ) : (
                            <List.ListLayout style={{ margin: 0, padding: 0 }}>
                                {Object.keys(searchResults).map((key) => (
                                    <List.ListItem key={searchResults[key]}>
                                        <TeamListItem
                                            member={searchResults[key]}
                                            orgId={orgId}
                                            // selectUser={selectUser}
                                        />
                                    </List.ListItem>
                                ))}
                            </List.ListLayout>
                        )}
                    </SearchResults>
                )}
            </Body>
        </>
    );
};

export default SearchPage;
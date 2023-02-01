import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    TableCell,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ListDelField, SubmitField } from "uniforms-material";
import { AutoForm, useForm } from "uniforms";
import { bridge as schema } from "../uniforms/AcAccountDocumentHSchema";
import {
    enumMovementTypes,
    GetCurrencies,
    MSCCurrencyFormatter,
} from "../../../../@mscComponnent/Global/GlobalFunc";
import {
    useGetAcBankAccountsLazyQuery,
    useGetAcTillsLazyQuery,
    useAcAccountdocumenthMutateMutation,
    AddOrUpdateEnum,
} from "../../../../generated/graphql";
import MSCTableField from "../../../../@mscComponnent/UniformsComponnents/MSCTableField";
import MSCListItemField from "../../../../@mscComponnent/UniformsComponnents/MSCTableRowField";
import GetAcAccountDocI from "./GetAcAccountDocI";
import AddIcon from "@mui/icons-material/Add";
import MSCLookup from "../../../../@mscComponnent/MSCInput/MSCLookup";
import moment from "moment";
import AutoLabelField from "../../../../@mscComponnent/UniformsComponnents/AutoLabelField";
import MSCTextField from "../../../../@mscComponnent/MSCInput/MSCTextField";
import { showMessage } from "../../../store/fuse/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { ViewMode } from "../../../../@mscComponnent/CRUDPage/MSCToolbar";
import {
    changeViewMode,
    getViewModeFunc,
} from "../../../store/mscToolbar/mscToolbarSlice";
import MSCDateLabelField from "../../../../@mscComponnent/UniformsComponnents/MSCDateLabelField";
import Loading from "../../../../@mscComponnent/Loading";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SalesCollectionModal(props) {
    const { t } = useTranslation();
    const [rowData, setRowData] = useState({});
    const [getAcBankAccountsLazyQuery, { data: dataAcBankAccounts }] =
        useGetAcBankAccountsLazyQuery();
    const [getAcTillsLazyQuery, { data: dataAcTills }] = useGetAcTillsLazyQuery();
    const [movementType, setMovementType] = useState("");
    const [ownerCode, setOwnerCode] = useState("");
    const [currency, setCurrency] = useState("TRY");
    const [amount, setAmount] = useState(0);
    const [itemExp, setItemExp] = useState("");
    const [addOrUpdate, setAddOrUpdate] = useState(AddOrUpdateEnum.Add);
    const [acAccountdocumenthMutateMutation, { data, loading, error }] =
        useAcAccountdocumenthMutateMutation();
    const [totalAmount, setTotalAmount] = useState(0);
    const user = useSelector(({ auth }) => auth.user);
    const dispatch = useDispatch();
    const getViewModeFuncEx = useSelector(getViewModeFunc);
    const ref_autoForm = useRef();
    const theme = useTheme();

    const period = moment().format("YYYY-MM").replace("-", "");
    let acJSON = {
        accdocno: "0", //Prosedürden gelecek
        accdoctype: props.invoiceH.invoicetype === "SA" ? 1 : 2,
        accdocyear: 0, //Prosedürden gelecek
        accountcode: "",
        companyid: 1,
        invoiceno: props.invoiceH.invoiceno,
        accountclassid: 1,
        // amountlc: 0,
        changetime: moment(),
        changeuser: user.data.displayName,
        createtime: moment(),
        createuser: user.data.displayName,
        currency: "TRY",
        currencylc: "TRY",
        deleted: false,
        docdate: moment(),
        exchangedate: moment(),
        exchangerate: 1,
        period: parseInt(period),
        plantid: 1,
        referenceno: "",
    };

    useEffect(() => {
        if (loading) {
            Loading.show();
        } else {
            Loading.hide();
        }
    }, [loading]);

    const CustomUniformButton = () => {
        const { t } = useTranslation();
        const uniforms = useForm();
        let acAccountDocumentI = [];
        const onButtonClick = () => {
            acAccountDocumentI.push({
                movementtypeid: movementType,
                ownercode: ownerCode,
                amountlc: parseFloat(amount),
                amount: parseFloat(amount),
                currency: currency,
                explanation: itemExp,
            });
            if (movementType !== "" || ownerCode !== "") {
                if (amount !== 0 && amount !== "" && amount !== "0") {
                    if (uniforms?.model?.acAccountdocumentis) {
                        if (props.balance >= totalAmount + acAccountDocumentI[0]?.amount) {
                            uniforms.onChange("acAccountdocumentis", [
                                ...uniforms?.model?.acAccountdocumentis,
                                ...acAccountDocumentI,
                            ]);
                            setMovementType("");
                            setOwnerCode("");
                            setAmount(0);
                            setItemExp("");
                        } else {
                            dispatch(
                                showMessage({
                                    message:
                                        "Girilen tutar toplamları bakiyeden fazla olduğu için ödeme ekleyemezsiniz.", //text or html
                                    autoHideDuration: 6000, //ms
                                    anchorOrigin: {
                                        vertical: "top", //top bottom
                                        horizontal: "right", //left center right
                                    },
                                    variant: "warning", //success error info warning null
                                })
                            );
                        }
                    } else {
                        if (props.balance >= totalAmount + acAccountDocumentI[0]?.amount) {
                            uniforms.onChange("acAccountdocumentis", acAccountDocumentI);
                            setMovementType("");
                            setOwnerCode("");
                            setAmount(0);
                            setItemExp("");
                        } else {
                            dispatch(
                                showMessage({
                                    message:
                                        "Girilen tutar toplamları bakiyeden fazla olduğu için ödeme ekleyemezsiniz.", //text or html
                                    autoHideDuration: 6000, //ms
                                    anchorOrigin: {
                                        vertical: "top", //top bottom
                                        horizontal: "right", //left center right
                                    },
                                    variant: "warning", //success error info warning null
                                })
                            );
                        }
                    }
                } else {
                    dispatch(
                        showMessage({
                            message: "Lütfen tutar giriniz.", //text or html
                            autoHideDuration: 6000, //ms
                            anchorOrigin: {
                                vertical: "top", //top bottom
                                horizontal: "right", //left center right
                            },
                            variant: "warning", //success error info warning null
                        })
                    );
                }
            } else {
                dispatch(
                    showMessage({
                        message: "Lütfen tüm alanları doldurunuz.", //text or html
                        autoHideDuration: 6000, //ms
                        anchorOrigin: {
                            vertical: "top", //top bottom
                            horizontal: "right", //left center right
                        },
                        variant: "warning", //success error info warning null
                    })
                );
            }
        };

        return (
            <Button
                color={"primary"}
                variant={"contained"}
                endIcon={<AddIcon />}
                onClick={onButtonClick}
            >
                {t("AddPayment")}
            </Button>
        );
    };

    useEffect(() => {
        getAcBankAccountsLazyQuery({
            variables: {
                bankAccountCode: { filterType: "", parameter: "" },
                bankAccountName: { filterType: "", parameter: "" },
                bankCode: { filterType: "", parameter: "" },
            },
        });
        getAcTillsLazyQuery({
            variables: {
                tillCode: { filterType: "", parameter: "" },
                tillName: { filterType: "", parameter: "" },
            },
        });
    }, []);

    const OwnerData = () => {
        let ownerData = [];
        if (movementType === 8) {
            const dataAcBankAcc =
                dataAcBankAccounts?.acBankaccountsWithFilterType?.filter(
                    (x) => x.creditcard === false
                );
            dataAcBankAcc?.map((item) => {
                ownerData.push({
                    label: `${item.bankaccountcode} | ${item.bankaccountname}`,
                    value: item.bankaccountcode,
                });
            });
        } else if (movementType === 1) {
            dataAcTills?.acTillsWithFilter?.map((item) => {
                ownerData.push({
                    label: `${item.tillcode} | ${item.tillname}`,
                    value: item.tillcode,
                });
            });
        } else if (movementType === 4) {
            const dataAcBankAcc =
                dataAcBankAccounts?.acBankaccountsWithFilterType?.filter(
                    (x) => x.creditcard === true
                );
            dataAcBankAcc?.map((item) => {
                ownerData.push({
                    label: `${item.bankaccountcode} | ${item.bankaccountname}`,
                    value: item.bankaccountcode,
                });
            });
        }
        return ownerData;
    };

    const AddOrUpdate = (model, addOrUpdateStatus) => {
        acAccountdocumenthMutateMutation({
            variables: {
                addOrUpdate: addOrUpdateStatus,
                prmAcAccountdocumenth: model,
            },
        }).then((res) => {
            console.log(res, "res");
            if (res.data.addOrUpdateAcAccountdocumenth.resultType === "SUC") {
                dispatch(
                    showMessage({
                        message: "Kaydedildi", //text or html
                        autoHideDuration: 6000, //ms
                        anchorOrigin: {
                            vertical: "top", //top bottom
                            horizontal: "right", //left center right
                        },
                        variant: "success", //success error info warning null
                    })
                );
                getViewModeFuncEx(ViewMode.Read);
                dispatch(changeViewMode(ViewMode.Read));
                Loading.hide();
                props.handleClose();
                props.refetch();
            }
        });
    };

    useEffect(() => {
        if (rowData?.acAccountdocumentis?.length > 0) {
            rowData?.acAccountdocumentis?.map((val) =>
                setTotalAmount(totalAmount + val.amountlc)
            );
            // setTotalAmount(rowData?.acAccountdocumentis[i]?.amountlc+totalAmount);
        }
    }, [rowData?.acAccountdocumentis?.length]);

    useEffect(() => {
        if (props?.showModal) {
            setTotalAmount(0);
        }
    }, [props?.showModal]);

    return (
        <Dialog
            fullScreen
            TransitionComponent={Transition}
            open={props.showModal}
            onClose={props.handleClose}
            style={{ height: "90%" }}
            scroll={"paper"}
        >
            <DialogTitle id="scroll-dialog-title" style={{ padding: 0, margin: 0 }}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton
                            style={{ marginLeft: 'auto' }}
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
                <p style={{ textAlign: "right" }}>
                    <span style={{ color: "red", fontSize: "large" }}>
                        {t("Balance")} :{" "}
                        {MSCCurrencyFormatter(props.balance - totalAmount, "TRY")}
                    </span>
                </p>

                <AutoForm
                    ref={ref_autoForm}
                    schema={schema}
                    onChangeModel={(model) => {
                        setRowData(model);
                        console.log(model, "model");
                    }}
                    onSubmit={(model) => {
                        acJSON = Object.assign(acJSON, {
                            amount: parseFloat(totalAmount),
                            stakeholderid: props.selectedStakeholder?.stakeholderid,
                            amountlc: parseFloat(totalAmount),
                        });
                        model = Object.assign(model, acJSON);
                        console.log(model, "submitted");
                        AddOrUpdate(model, addOrUpdate);
                    }}
                >
                    <Grid container spacing={1} paddingX={5} paddingY={2}>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCTextField
                                label={t("stakeholdername")}
                                disabled
                                value={
                                    props.selectedStakeholder
                                        ? props.selectedStakeholder.stakeholdername
                                        : ""
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCDateLabelField
                                name={"docdate"}
                                label={
                                    props.invoiceH.invoicetype === "SA"
                                        ? t("docdate")
                                        : t("paymentdate")
                                }
                                value={moment(rowData?.docdate).format("YYYY-MM-DD")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <AutoLabelField name={"explanation"} label={t("explanation")} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCLookup
                                label={
                                    props.invoiceH.invoicetype === "SA"
                                        ? t("movementtypes")
                                        : t("paymenttype")
                                }
                                options={enumMovementTypes()}
                                value={movementType}
                                onChange={(e) => setMovementType(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCLookup
                                label={t("BuyerTillBankName")}
                                options={OwnerData() ? OwnerData() : []}
                                value={ownerCode}
                                onChange={(e) => setOwnerCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCLookup
                                label={t("currency")}
                                options={GetCurrencies(props.dataCurrencies)}
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCTextField
                                label={t("amount")}
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCTextField
                                label={t("itemexplanation")}
                                onChange={(e) => setItemExp(e.target.value)}
                                value={itemExp}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={4} md={4}>
                            <CustomUniformButton />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12} md={12}>
                            <MSCTableField
                                name="acAccountdocumentis"
                                columns={[
                                    props.invoiceH.invoicetype === "SA"
                                        ? t("movementtypes")
                                        : t("paymenttype"),
                                    t("account"),
                                    t("amountlc"),
                                    t("currency"),
                                    t("explanation"),
                                ]}
                                addIcon={null}
                                disabled={true}
                            >
                                <MSCListItemField name="$">
                                    <GetAcAccountDocI
                                        acJSON={acJSON}
                                        selectedStakeholder={props.selectedStakeholder}
                                        invoiceH={props.invoiceH}
                                    />
                                    <TableCell
                                        align="center"
                                        style={{
                                            border: "0.5px solid #DCDCDC",
                                            height: "5",
                                            padding: 0,
                                        }}
                                    >
                                        <ListDelField
                                            name=""
                                            size={"small"}
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            style={{ padding: "0px 5px", margin: "0px" }}
                                            disabled={false}
                                        />
                                    </TableCell>
                                </MSCListItemField>
                            </MSCTableField>
                        </Grid>
                    </Grid>
                </AutoForm>
            </DialogContent>
            <Divider style={{ color: 'black' }} />
            <DialogActions style={{ padding: 15 }}>
                <SubmitField
                    label={t("Save")}
                    onClick={() => ref_autoForm.current.submit()}
                />
            </DialogActions>
        </Dialog>
    );
}
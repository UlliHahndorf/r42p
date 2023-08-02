import React from 'react';

import DataGrid, { Column, ColumnChooser, ColumnFixing, FilterRow, GroupPanel, HeaderFilter, Paging, Scrolling, Button, Editing } from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';

const serviceUrl = import.meta.env.VITE_BACKEND_URL;

// const remoteDataSource = createStore({
//     key: 'ID',
//     loadUrl: serviceUrl + '/recipes/load',
//     insertUrl: serviceUrl + '/recipes/save',
//     updateUrl: serviceUrl + '/recipes/save',
//     deleteUrl: serviceUrl + '/recipes/remove'
// });

// import 'devextreme/localization/globalize/number';
// import 'devextreme/localization/globalize/date';
// import 'devextreme/localization/globalize/currency';
// import 'devextreme/localization/globalize/message';

import deMessages from 'devextreme/localization/messages/de.json';
import enMessages from 'devextreme/localization/messages/en.json';
import { locale, loadMessages } from "devextreme/localization";
import i18n from '../../../shared/i18n';
import Icon from '../../../shared/components/Icon';
import './Grid.scss'

const Grid: React.FC = () => {

    loadMessages(deMessages);
    loadMessages(enMessages);
    locale(i18n.language);

    const { t } = useTranslation();
    
    function ColumnDateCreated(rowData: { dateCreated: { toLocaleString: () => string; }; }) {
        return rowData.dateCreated.toLocaleString() + "foo";
        //return new Date(cellInfo).toLocaleString();
    }

    let content = (
        <div id="gridOut" className="dx-viewport borderlessGrid">
            <Icon name='books' size='2x' /> <span className='title'>{t('recipes.title')}</span>

            <DataGrid id="dataGrid"
                dataSource={serviceUrl + "/recipes"}
                allowColumnResizing={true}
                allowColumnReordering={true}
                columnResizingMode="widget"
                columnAutoWidth={true}
                wordWrapEnabled={true}
                showBorders={true}
		        showColumnLines={true}
		        showRowLines={true}
            >
                <FilterRow visible={true} />
                <ColumnFixing enabled={false} />
                <ColumnChooser enabled={true} mode="dragAndDrop" />
                <Scrolling mode="virtual" />
                <GroupPanel visible={true} />
                <HeaderFilter visible={true} />
                <Paging enabled={false} />
                <Scrolling mode="standard" />
                <Editing 
                    mode='popup'
                    allowAdding={true}
                    allowUpdating={true} 
                    allowDeleting={true}
                    confirmDelete={true}
                    useIcons={false}
                />

                <Column dataField="title"           caption={t('recipes.list.title')} />
                {/* fixed={true} fixedPosition="left" /> */}
                <Column dataField="ingredients"     caption={t('recipes.list.ingredients')} />
                <Column dataField="instructions"    caption={t('recipes.list.instructions')} />
                <Column dataField="numberServings"  caption={t('recipes.list.numberServings')} />
                <Column dataField="quantities"      caption={t('recipes.list.quantities')} />
                <Column dataField="category"        caption={t('recipes.list.category')} />
                <Column dataField="dateCreated"     caption={t('recipes.list.dateCreated')} calculateCellValue={ColumnDateCreated} />
                <Column dataField="dateModified"    caption={t('recipes.list.dateModified')} />
                <Column dataField="source"          caption={t('recipes.list.source')} />
                <Column dataField="notes"           caption={t('recipes.list.notes')} />
                <Column dataField="description"     caption={t('recipes.list.description')} />
                <Column dataField="price"           caption={t('recipes.list.price')} />
                <Column type="buttons" width={110}>
                    <Button name="edit" cssClass="click-pri"><Icon name='pen-to-square' size='lg' /></Button>
                    <Button name="delete" cssClass="click-pri"><Icon name='trash-can' size='lg' /></Button>
                </Column>
                {/* <RemoteOperations groupPaging={true} /> */}
            </DataGrid>
        </div>
    );


    return content
};

export default Grid;
